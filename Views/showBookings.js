sap.ui.jsview("sap.training.gw100.view.showBookings",
		{
			getControllerName: function(){ return "sap.training.gw100.controller.doFlightInfo"; },
			createContent: function(oController){
				return buildTableFromMetadata(oFlightModel, oController.getBookingEntityName());
			}
		}
);
