sap.ui.jsview("sap.training.gw100.view.showFlights",
		{
			getControllerName: function(){ return "sap.training.gw100.controller.doFlightInfo"; },
			createContent: function(oController){
				return buildTableFromMetadata(oFlightModel, oController.getFlightEntityName());
			}
		}
);
