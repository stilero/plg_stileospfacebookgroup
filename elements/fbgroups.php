<?php
/**
* Description of AutoFBook4
*
* @version  1.2
* @author Daniel Eliasson - joomla at stilero.com
* @copyright  (C) 2012-maj-21 Stilero Webdesign http://www.stilero.com
* @category Custom Form field
* @license    GPLv2
*/
 
// no direct access
defined('_JEXEC') or die('Restricted access');
/**
 * Class for handling files for the FBPAges
 */
class fbGroups{
    
    const ASSETS_PATH = 'media/stilerospfacebookgroup/assets/';
    const IMAGE_PATH = 'media/stilerospfacebookgroup/assets/images/';
    const JS_PATH = 'media/stilerospfacebookgroup/assets/js/';
    const FBGROUPS_JS = 'fbgroups.js';
    const ELEMENTS_JS = 'j16Elements.js';
    
    /**
     * Adds general JS to the document source
     */
    static function addJsGeneral(){
        $document = JFactory::getDocument();
        $document->addScript( JUri::root() . fbGroups::JS_PATH . fbGroups::FBGROUPS_JS );
    }
    
    /**
     * Returns a list element with all the groups user is part of
     * @param string $id id of the form element
     * @param string $name name of the form element
     * @return string HTML
     */
    static function groupsList($id, $name=''){
        $htmlCode =
        '<select id="'.$id.'" name="'.$name.'">'.
        //'<option selected="selected" value="me">'.JText::_('PLG_SYSTEM_AUTOFBOOK_ELEMENT_FBPAGES_PERSONAL').'</option>'.
        '</select>';
       
        return $htmlCode;
    }
    
    /**
     * Adds element JS to the document source
     */
    static function addJs16(){
        $document = JFactory::getDocument();
        $document->addScript(JUri::root() . fbGroups::JS_PATH . fbGroups::ELEMENTS_JS );
    }
    
    /**
     * Adds translation strings as JS to the document source
     */
    static function addTranslationJS(){
        $document = JFactory::getDocument();
        $jsTranslationStrings = 'var PLG_SYSTEM_AUTOFBOOK_JS_SUCCESS = "'.JText::_('PLG_SYSTEM_AUTOFBOOK_JS_SUCCESS').'";';
        $jsTranslationStrings .= 'var PLG_SYSTEM_AUTOFBOOK_JS_FAILURE = "'.JText::_('PLG_SYSTEM_AUTOFBOOK_JS_FAILURE').'";';
        $document->addScriptDeclaration($jsTranslationStrings);        
    }
}

/**
 * Class for customising the form element
 */
class JFormFieldFbgroups extends JFormField {
    protected $type = 'fbgroups';
    
    /**
     * Returns the HTML source for the input
     * @return string HTML html source for the input
     */
    protected function getInput(){
        fbGroups::addJs16();
        fbGroups::addJsGeneral();
        fbGroups::addTranslationJS();
        return fbGroups::groupsList($this->id, $this->name);
    }
    
    /**
     * Returns the Label HTML
     * @return string HTML
     */
    protected function getLabel(){
        $toolTip = JText::_($this->element['description']);
        $text = JText::_($this->element['label']);
        $labelHTML = '<label id="'.$this->id.'-lbl" for="'.$this->id.'" class="hasTip" title="'.$text.'::'.$toolTip.'">'.$text.'</label>';
        return $labelHTML;
    }

}//End Class
