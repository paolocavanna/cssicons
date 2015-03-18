var playersMd = (function() {

    var addEvent = function(event, fn) {
        if (!playersMd.events[event]) playersMd.events[event] = [];
        playersMd.events[event].push({
            context: this,
            callback: fn
        });
        return this;
    };

    var callEvt = function(event) {
        if (!playersMd.events[event]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = playersMd.events[event].length; i < l; i++) {
            var evt = playersMd.events[event][i];
            evt.callback.apply(evt.context, args);
        }
        return this;
    };

    return {
        events: {},
        addEvent: addEvent,
        callEvt: callEvt,
        addToTeam: function(obj) {
            obj.addEvent = addEvent;
            obj.callEvt = callEvt;
        }
    };

}());

var obj = {
    name: 'Francesco',
    role: "Portiere"
};
playersMd.addToTeam(obj);
obj
	.addEvent('changePlayerName', function(argument) {
	    var previousName = this.name;
	    this.name = argument;
	    console.log("Player name '" + previousName + "' has changed in '" + this.name + "'");
	})
	.addEvent('changePlayerRole', function(argument) {
	    var previousRole = this.role;
	    this.role = argument;
	    console.log("Player role '" + previousRole + "' has changed in '" + this.role + "'");
	})
	.callEvt('changePlayerName', 'Alberto')
	.callEvt('changePlayerRole', 'Attaccante');
	
console.dir(obj);
