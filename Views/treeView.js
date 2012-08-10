sap.ui.jsview("sap.training.gw100.view.treeView",
		{
			getControllerName: function(){ return "sap.training.gw100.controller.doFlightInfo"; },
			getLetterIndex: function(letter)
			{
			   return 1;  
			},
			createContent: function(oController){
				
				
				var oModel = oFlightModel.getModel();
				var oBookingDetails = new sap.ui.commons.layout.MatrixLayout();
                oBookingDetails.setLayoutFixed(false);
                oBookingDetails.setModel(oModel);
                oBookingDetails.createRow(new sap.ui.commons.Label({
                        text : "Airline Id",
                        width : "100px"
                }), new sap.ui.commons.TextField({
                        editable : false,
                        width : "200px",
                        value : "{Price}"
                }));
                
                oBookingDetails.createRow(new sap.ui.commons.Label({
                        text : "Connection No.",
                        width : "100px"
                }), new sap.ui.commons.CheckBox({
                        editable : true,
                        width : "150px",
                        value : "{Cancelled}"
                }));
                
                
                
				var oTree = new sap.ui.commons.Tree("tree");
				oTree.setTitle("Please select a flight");
				oTree.setWidth("100%");
				oTree.setHeight("auto");
				oTree.setShowHeaderIcons(true);
				oTree.setShowHorizontalScrollbar(false);
				
				oTree.attachSelect( function(e)
				{
				   setAirport(e.mParameters.node.sId); 
				});
				
				var oModel = oFlightModel.getModel();
				//var oRootNode = new sap.ui.commons.TreeNode("root", {text:"Airports", expanded: false});
				var letterNodes = [];
				var oRootNode = new sap.ui.commons.TreeNode("root", {text:"Companies", expanded: false});
				var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
				var companies = oController.readCompanyEntitySet("Companies", false);
				var contacts = oController.readCompanyEntitySet("Contacts", false);
				var companyNodes = [];
				
                var oCompanyNode;
				for(var i=0; i<letters.length; i++)
                {
                    oTreeNode = new sap.ui.commons.TreeNode(letters[i], {text:letters[i], icon:"./Views/Images/location.png", expanded: false});
                    letterNodes.push(oTreeNode);
                    oRootNode.addNode(oTreeNode);
                }
				
				for(var j=0; j<companies.length; j++)
                {
                    var name = companies[j].CompanyName;
                    var firstLetter = name.charAt(0).toUpperCase();
                    var letterIndex = parseInt(companies[j].NodeIndex);
                    console.log(letterIndex+" = LetterIndex");
                    if( letterIndex >= 0 && letterIndex < 26 && name != "")
                    {
                        var node = letterNodes[letterIndex];
                        oCompanyNode = new sap.ui.commons.TreeNode("A"+companies[j].CompanyId, {text:companies[j].CompanyName, icon:"./Views/Images/location.png", expanded: false});
                        
                        node.addNode(oCompanyNode);
                    }

                }

				oTree.addNode(oRootNode);
				var oTreeNode;
				var airportNodes = [];
				
		         // Call controller to fetch airports
               /* var airports = oController.readEntitySet("Airports", false);
				
				
				//alert(companies.length + " is aantal companies");
				
			    for(var i=0; i<airports.length; i++)
			    {
			        oTreeNode = new sap.ui.commons.TreeNode(airports[i].IATACode, {text:airports[i].Title, icon:"./Views/Images/location.png", expanded: false});
			        airportNodes.push(oTreeNode);
			        oRootNode.addNode(oTreeNode);
			    }
				
				// Call controller to fetch flights for airports
				var airport, flights, length;
				for(var i=0; i<airports.length; i++)
                {
                    airport = airports[i].IATACode;
                    airport = "Airports('" + airport + "')/DepartingFlights/";
                    flights = oController.readEntitySet(airport, false);
                    length = flights.length;
                    
                    for(var j=0; j<length; j++)
                    {
                        //console.log(flights[j].__metadata.uri);
                        oTreeNode = new sap.ui.commons.TreeNode("flight"+i+j, {text:flights[j].Title, icon:"./Views/Images/plane.png", expanded: false});
                        var node = airportNodes[i];
                        node.addNode(oTreeNode);
                    }
                }
				
                var bookingsView = sap.ui.jsview("sap.training.gw100.view.showBookings");
                
                bookingsView.mAggregations.content[0].attachRowSelect(function(e)
                {
                    var context = e.getParameter("rowContext");
                    var aContext = oBookingDetails.getBindingContext();
                    var booking = oModel.getData(context);
                    oBookingDetails.bindContext(context);
                    
                    booking.Cancelled = "X";
                    
                    //oModel.update(context,booking);
                });
                */
                var oLayout = new sap.ui.commons.layout.MatrixLayout({
                    id : "mainLayout",
                    layoutFixed : true,
                    columns : 2,
                    width : "100%",
                    widths : [ "30%", "70%" ]
                });
            

                var cell1 = new sap.ui.commons.layout.MatrixLayoutCell();
                cell1.setVAlign(sap.ui.commons.layout.VAlign.Top);
                cell1.addContent(oTree);
                
                var oCell2 = new sap.ui.commons.layout.MatrixLayoutCell();
                oCell2.setVAlign(sap.ui.commons.layout.VAlign.Top);
                oCell2.setSeparation(sap.ui.commons.layout.Separation.Small);
                //Add the map canvas
                oCell2.addContent(new sap.ui.core.HTML(
                                        {
                                                content : "<div id='map_canvas' style='width: 100%; height: 600px;'></div>"
                                        }));
                                        
                
                oLayout.createRow(cell1,oCell2);                       
                /*var cell2 = new sap.ui.commons.layout.MatrixLayoutCell();
                cell2.setVAlign(sap.ui.commons.layout.VAlign.Top);
                cell2.setSeparation(sap.ui.commons.layout.Separation.Small);
                cell2.addContent(bookingsView);
                
                oLayout.createRow(cell1,oCell2);
                
                
                var cell3 = new sap.ui.commons.layout.MatrixLayoutCell();
                cell3.setVAlign(sap.ui.commons.layout.VAlign.Top);
                cell3.setSeparation(sap.ui.commons.layout.Separation.Small);
                cell3.addContent(oBookingDetails)
                
                oLayout.createRow(null,oCell2);*/
				return oLayout;
				
			}
		}
);

function getLetterIndex(letter)
{
    var letterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letterString.indexOf(letter);
}
