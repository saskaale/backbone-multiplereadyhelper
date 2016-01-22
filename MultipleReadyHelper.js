define([
  'jquery',
  'underscore',
  'backbone',
  './ReadyHelper'
  ], function($, _, Backbone, ReadyHelper){

  var MultipleReadyHelper = function(){
      	this.toload = [];
	this.loaded = false;
	
	this.towait = [];
	this.loadedcnt = 0;
	
	this.readyhelper = new ReadyHelper();
	
	_.bindAll(this, 'onReady', '__onLoadedOne');
  };
  MultipleReadyHelper.prototype = {
    /*
     * An other helper-like object which this helper will wait for
     */
    waitFor: function(obj){
      this.towait.push(obj);
    },
    /*
     * Begin the work now
     */
    start: function(){
      for(var i = 0; i < this.towait.length; i++){
	this.towait[i].onReady(this.__onLoadedOne);
      }
    },
    /*
     * Internal private function for coping with callbacks
     */
    __onLoadedOne: function(){
      this.loadedcnt++;
      if(this.loadedcnt >= this.towait.length){
	this.towait = [];
	this.loadedcnt = 0;
	this.readyhelper.onLoaded();
      }
    },
    /*
     * An function where you register callback which will be fired after this function activate
     * @param cbk callback
     */
    onReady: function(cbk){
      return this.readyhelper.onReady(cbk);
    }

  };
	 
  return MultipleReadyHelper;
});