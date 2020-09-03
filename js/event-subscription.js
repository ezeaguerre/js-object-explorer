class EventSubscription {
	static subscribeOn( target, eventName, handler, options ) {
		const subscription = new this( target, eventName, handler, options );
		return subscription.subscribe();
	}

	constructor( target, eventName, handler, options ) {
		this.target = target;
		this.handler = {
			eventName,
			handler,
			options
		};
		this.target = target;
	}

	subscribe() {
		const { eventName, handler, options } = this.handler;
		this.target.addEventListener( eventName, handler, options );
		return this;
	}

	unsubscribe() {
		const { eventName, handler, options } = this.handler;
		this.target.removeEventListener( eventName, handler, options );
		return this;
	}
}

class Subscriptions {
	constructor() {
		this.subscriptions = [];
	}

	subscribeOn( target, eventName, handler, options ) {
		const subscription = EventSubscription.subscribeOn( target, eventName, handler, options );
		this.addSubscription( subscription );
		return this;
	}

	addSubscription( subscription ) {
		this.subscriptions.push( subscription );
		return this;
	}

	addSubscriptions( ...subscriptions ) {
		subscriptions.forEach( s => this.addSubscription( s ) );
		return this;
	}

	unsubscribe() {
		this.subscriptions.forEach( s => s.unsubscribe() );
		this.subscriptions = [];
	}
}
