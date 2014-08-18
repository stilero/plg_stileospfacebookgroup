/**
* MooTools script for retrieving groups that the user belongs to
*
* @version  1.0
* @author Daniel Eliasson - joomla at stilero.com
* @copyright  (C) 2014-aug-16 Stilero Webdesign http://www.stilero.com
* @license    GPLv2
*/
window.addEvent('domready', function(){
    var groupID = $(fbGroupIdElement).value;
    var defaultSelectList = $(fbGroupsElement).get('html');  
    var groups = new Array();
    var grantType = 'publish_actions, manage_pages';
    var requestUrl = 'https://graph.facebook.com/me/groups';
    var setPageSelection = function(){
        if(groupID === ''){
            groupID = $(fbGroupsElement).get('value');
        }
        $(fbGroupIdElement).value = groupID;
    };
    
    var handlePageResponse = function(response){
        if(response.data === 'undefined'){
            var errormsg = '(' + response.code + ')' +
                response.type + '\n' +
                response.message;
                alert(errormsg);
        }else{
            //get the current options selectId's options
            //evalResponse(response, 'data');
            var options = $(fbGroupsElement).get('html');
            //$.each(response.data, function(value, key){
//                response.data.each(function(value, key){
//                    alert(value.id);
//                });
            response.data.each(function(value, key){
                var selected = (value.id === groupID) ? ' selected="selected" ' : '';
                //if(value.category != 'Application'){
                    //groups[value.id] = value.access_token;
                    options = options + '<option value="' + value.id + '"'+selected+'>' + value.name + '</option>';
                //}
               //var newoption = new Option("option html", "option value");
               //$(fbPagesElement).add(newoption);
            });
            $(fbGroupsElement).set('html', options);
            $(fbGroupsElement).setStyle('display', 'block');
            $('jform_params_fb_groups_chzn').setStyle('display', 'none');


        }
    };
    
    var evalResponse = function(response, context){
        var resAsText = 'response from ' + context + ': ';
        $each(response, function(value, key){
            if(typeOf(value) === 'object'){
                $each(value, function(objVal, objKey){
                    if(typeOf(objVal) === 'object'){
                        $each(objVal, function(obj2Val, obj2Key){
                            resAsText += 'Obj2[ ' +obj2Key + '] = '+ obj2Val + ' ';
                        });
                    }
                    resAsText += 'Obj[ ' +objKey + '] = '+ objVal + ' ';
                });
            }
            resAsText += 'resp[ ' +key+']='+ value + ' ';
        });
        alert(resAsText);
    };
    
    /**
     * AJAX method for retrieving groups
     */
    var requestPages = function(){
        if($(accessTokenElement).value === ''){
            $(fbGroupsElement).set('html', defaultSelectList);
            return;
        }
        // FOR DEBUGGING
        //alert('https://graph.facebook.com/me/accounts?' + 'access_token=' + $(accessTokenElement).value + '&grant_type=manage_groups' );
        var pageRequest = new Request.JSONP({
            url: requestUrl,
            method: 'post',
            data:{
                'access_token': $(accessTokenElement).value,
                'grant_type': grantType
            },
            onRequest: function(){
                $(fbGroupsElement).set('class', 'readonly ajaxloader');
            },
            onSuccess: function(response){
                handlePageResponse(response);
            },
            onFailure: function(response){
                alert(PLG_SYSTEM_AUTOFBOOK_JS_FAILURE + response.status);
            },
            onComplete: function(){
                $(fbGroupsElement).set('class', 'readonly');
            }
        });
        pageRequest.cancel().send();
    };
    
    /**
     * Event listeners
     */
    $(fbGroupsElement).addEvent('change', function(){
        groupID = $(fbGroupsElement).get('value');
        $(fbGroupIdElement).value = groupID;
        $(fbPageAuthTokenElement).value = groups[groupID];
    });
    
    $(accessTokenElement).addEvent('change', function(){
        requestPages();
    });
    
    requestPages();    

});