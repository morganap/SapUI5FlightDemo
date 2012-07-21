sap.ui.controller("sap.training.gw100.controller.doFlightInfo",
	(function()
	{
	    var oModel = oFlightModel.getModel();
		return{
			getFlightEntityName: function(){ return "Flight"; },
			getBookingEntityName: function(){ return "Booking"; },
			getAirportEntityName: function(){ return "Airport"; },
			readEntitySet: function(entitySet,isASynch)
            {
                var entitySet;
                oModel.read(entitySet,null,null,isASynch,
                        function(oData, response)
                        {
                            entitySet = oData.results;
                        },
                        function(eError)
                        {
                            alert('Something went wrong during communication with the backend');
                        }
                );
                return entitySet;
            }
		};
	}())
);

			
