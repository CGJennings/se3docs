//
// painter-lib.js
// A helper library that provides support for getting and
// setting portrait images.
//

importClass( ca.cgjennings.math.Interpolation );
importPackage( ca.cgjennings.graphics.filters );

/**
 * Painter.paint( image )
 * Applies painting effects to the specified image, returning the painted
 * version. The following properties are used to configure the paint effect:
 * <code>hueShift, satBoost, briAdjust, conAdjust, levels, radius,
 * sketch, insensitivity, strength</code>.
 */
let Painter = {
	hueShift: 0.125,
	satBoost: 1.55,
	briAdjust: 0,
	conAdjust: 0,
	levels: 32,
	radius: 5,
	sketch: true,
	insensitivity: 3,
	strength: 4,

	paint: function paint( image ) {
		let painted = this.colourAndLighting( image );
		painted = this.paintEffect( painted );
		if( this.sketch ) {
			painted = this.sketchEffect( painted, image );
		}
		return painted;
	},

	colourAndLighting: function colourAndLighting( im ) {
		// Note that 'im' is the original image. We must take care
		// not to overwrite the image data when applying filters.
		// (See lines marked '*', below.)
		if( this.hueShift != 0 || this.satBoost != 1 ) {
			this.tintFilt.setFactors( this.hueShift, this.satBoost, 1 );
			im = this.tintFilt.filter( im, null ); //*
		}
		if( this.briAdjust != 0 || this.conAdjust != 0 ) {
			this.briConFilt.brightness = this.briAdjust;
			this.briConFilt.contrast = this.conAdjust;
			im = this.briConFilt.filter( im, im == this.photo ? null : im ); //*
		}
		return im;
	},

	paintEffect: function paintEffect( im ) {
		this.oilFilt.setLevels( this.levels );
		this.oilFilt.setSmearRadius( this.radius );
		im = this.oilFilt.filter( im, null );
		// smooth out the paint edges
		im = this.oilEdgeBlurFilt.filter( im, null );
		return im;
	},

	sketchEffect: function sketchEffect( im, original ) {
		// for sketch lines, we perform edge detection on the
		// source image, then convert the edges into greyscale,
		// and convert that to a black image with those greyscale
		// values as the alpha channel
		let sketchTemp = this.greyFilt.filter( original, null );
		if( this.insensitivity > 0 ) {
			this.sensitivityFilt.radius = this.insensitivity;
			sketchTemp = this.sensitivityFilt.filter( sketchTemp, null );
		}
		sketchTemp = this.edgeFilt.filter( sketchTemp, null );
		sketchTemp = this.outlineFilt.filter( sketchTemp, ImageUtils.create( im.width, im.height, true ) );
		this.imageStats.analyze( sketchTemp );

		let minA = this.imageStats.alphaMin / 255;
		let avgA = this.imageStats.alphaMean / 255;
		let maxA = this.imageStats.alphaMax / 255;

		let newMax = 0.5 + this.strength * 0.10;
		let newAvg = avgA / maxA * newMax;
		newAvg += newAvg * this.strength/4;
		newAVg = Math.min( newMax, newAvg );

		this.channelFilt.alphaFunction = new Interpolation.CubicSpline(
			[minA,   avgA,   maxA],
			[   0, newAvg, newMax]
		);
		sketchTemp = this.channelFilt.filter( sketchTemp, sketchTemp );
		sketchTemp = this.sensitivityFilt.filter( sketchTemp, null );


		// draw outline over painted image
		g = null;
		try {
			g = im.createGraphics();
			g.drawImage( sketchTemp, 0, 0, null );
		} finally {
			if( g ) g.dispose();
		}

		// uncomment to show sketch image for debugging
//		im = this.invertFilt.filter( sketchTemp, sketchTemp );


		return im;
	},

	tintFilt: new TintFilter(),
	briConFilt: new BrightnessContrastFilter(),
	oilFilt: new OilPaintingFilter(),
	greyFilt: new GreyscaleFilter(),
	invertFilt: new InversionFilter(),
	outlineFilt: new ChannelSwapFilter( ChannelSwapFilter.RED, 0, 0, 0 ),
	edgeFilt: new ConvolveFilter( 3, 3, [-1,-1,-1,-1,8,-1,-1,-1,-1] ),
	oilEdgeBlurFilt: new BlurFilter( 1, 1 ),
	sensitivityFilt: new GaussianBlurFilter(),
	imageStats: new ca.cgjennings.graphics.ImageStatistics(),
	channelFilt: new ChannelFunctionFilter()
};
