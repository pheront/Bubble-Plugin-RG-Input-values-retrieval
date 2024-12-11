function(instance, properties, context) {

  //Do the operation

	var inputValues = [];
    instance.publishState('errormessage', '');
    instance.publishState('inputValues', inputValues);
    
    if(properties.debuglogs) {console.log('Plugin RG input values retrieval - Launch');}
    
    try {
    
    	if ((properties.rggroupid == null) || (properties.rggroupid == 'undefined')) {throw new Error('ID Attribute non renseigné');}
        
        if (properties.debuglogs) {
        	console.log('Type de rggroupid:', typeof properties.rggroupid);
    		console.log('RG found:', typeof properties.rggroupid);
    		console.log('Type de rggroupid:', typeof properties.rggroupid);}
        
    	const groupParentName = properties.rggroupid;   
		const rggroupidjqueryname = '#'+ groupParentName;
    
        // DOM node identification
    	const rgDOMid = $(rggroupidjqueryname);
        
        if (!rgDOMid || Object.keys(rgDOMid).length==0) {throw new Error('No RG group element detected in the page with the current ID attribute');}
    
        if (properties.debuglogs) {
    		console.log('element rgDOMid', rgDOMid);}
  
    	// Extraction of all the Input descendants of the repeating group
    	const inputs = rgDOMid.find('*Input*');
        
        if ((inputs.length == 0) || (inputs == null) || (inputs == 'undefined')) {throw new Error('No Input elements detected in the DOM');}
    
		if (properties.debuglogs) {
            console.log('elements rgDOMid', rgDOMid);}
        
    	// Storage of the input values in a list of texts
    	inputValues = Array.from(inputs).map(input => input.value);
 
    	if (properties.debuglogs) {
        	console.log('inputValues : ', inputValues);    
    		console.log('Plugin RG input values retrieval - End');}
    
    	// Exit variable publishing
    	instance.publishState('inputValues', inputValues);
        
    } catch(e) {
        
        console.error(e);
        console.error('Error cause = ', e.cause);
        
        instance.publishState('errormessage', e.message);
        
        if (properties.debuglogs) {console.log('Plugin RG input values retrieval - End');}
    }
    
}