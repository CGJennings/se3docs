importClass( ca.cgjennings.graphics.filters.TurnAndFlipFilter );

function createResource() {
	return new TurnAndFlipFilter( TurnAndFlipFilter.TURN_90_LEFT )
		.filter( ResourceKit.getImage( 'proto/bridge-tpl.png'), null );
}