var buildTableFromMetadata = function(oModel, entityName)
{
	var oMetaData = oModel.getMetadata();
	var thisEntityType = oMetaData.namespace + "." + entityName;
	
	var thisEntitySetName = "";
	var colList = [];
	var i=0; var j=0;
	for(i=0;i<oMetaData.entityType.length;i++)
	{
		if(oMetaData.entityType[i].name && oMetaData.entityType[i].name === entityName)
		{
			for( j=0; j<oMetaData.entityContainer[0].entitySet.length; j++)
			{
				if(oMetaData.entityContainer[0].entitySet[j].entityType === thisEntityType)
				{
					thisEntitySetName = oMetaData.entityContainer[0].entitySet[j].name;
				}
			}
			
			for(j=0; j<oMetaData.entityType[i].property.length; j++)
			{
				if( oMetaData.entityType[i].property[j].type.substring(0,4) == "Edm." )
				{
					colList.push({
						
							label:oMetaData.entityType[i].property[j].name, 
							template: new sap.ui.commons.TextView().bindProperty("text", oMetaData.entityType[i].property[j].name )
						});
				}
			}
			
			
		}
		
	}
	
	//alert(colList.length);
	var oTable = new sap.ui.table.DataTable({columns:colList});
	oTable.setModel(oModel.getModel());
	//alert(thisEntitySetName);
	oTable.bindAggregation("rows", thisEntitySetName);

	return oTable;
	
}