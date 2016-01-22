define([
  'jquery',
  'underscore',
  'backbone',
  './MultipleReadyHelper'
       ], function($, _, Backbone,MultipleReadyHelper){

  var WaitingForManyModel = Backbone.Model.extend({
    initialize: function(options){
	_.bindAll(this, 'parseConfig');
    
	
	
	//initialize ready helper here
	this.innerModel1 = new InnerModel1();	//!!!! Must implement onReady schema as in ReadyHelper
	this.innerModel2 = new InnerModel2();	//!!!! Must implement onReady schema as in ReadyHelper
	this.innerModel2 = new InnerModel3();	//!!!! Must implement onReady schema as in ReadyHelper

	this.multipleReadyHelper = new MultipleReadyHelper();
	
	//register all nested models into this
	this.innerModel1.waitFor(this.innerModel1);
	this.innerModel2.waitFor(this.innerModel2);
	this.innerModel3.waitFor(this.innerModel3);
		
	//start now - IMPORTANT TO CALL after all waitFor objects would be added in
	this.multipleReadyHelper.start();
    },
    /*
     * An function where you register callback which will be fired after this object down
     */
    onReady: function(cbk){
	return this.multipleReadyHelper.onReady(cbk);
    }
  });

  return WaitingForManyModel;
});