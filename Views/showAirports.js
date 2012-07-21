sap.ui.jsview("sap.training.gw100.view.showAirports",
		{
			/* Test Comment for GIT Change */
			getControllerName: function(){ return "sap.training.gw100.controller.doFlightInfo"; },
			createContent: function(oController){
				return buildTableFromMetadata(oFlightModel, oController.getAirportEntityName());
			}
		}
);
