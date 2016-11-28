jQuery.fn.blockly = function(options) {
    var settings = $.extend({
        'codeTypes': [],
        'toolBoxXMLText': null,
        'classBlocklyCodeContent': 'blockly_code_content',
        'media': 'media/'
    }, options);

    var content_area = this;
    var content_area_id = this.attr('id');
    var workspace;
    var selectedCodeType;

    var init = function() {
        for (var i = settings.codeTypes.length - 1; i >= 0; i--) {
            if (settings.codeTypes[i].name !== "blocks") {
                content_area.after('<pre id="content_' + settings.codeTypes[i].name + '" class="' + settings.classBlocklyCodeContent + '" style="position:absolute;"/>');
            }
        }
        content_area.after('<textarea id="content_xml" class="' + settings.classBlocklyCodeContent + '" style="position:absolute;" readonly/>');

        var toolboxXml = Blockly.Xml.textToDom(settings.toolBoxXMLText);

        workspace = Blockly.inject(content_area_id, {
            grid: {
                spacing: 25,
                length: 3,
                colour: '#ccc',
                snap: true
            },
            media: settings.media,
            rtl: false,
            toolbox: toolboxXml,
            zoom: {
                controls: true,
                wheel: true
            }
        });
        setCodeType('blocks');
        onResize();
        Blockly.svgResize(workspace);
    }

    var loadToolBoxXML = function(success, error) {
        console.log(settings.toolboxXML);
        if (settings.toolboxXML.url) {
            $.ajax({
                url: settings.toolboxXML.url,
                type: 'GET',
                dataType: 'text',
                timeout: 1000,
                error: function() {
                    alert("ロード失敗");
                },
                success: function(toolboxText) {
                    toolboxText = toolboxText.replace(/{(\w+)}/g,
                        function(m, p1) {
                            return MSG[p1]
                        });
                    var toolboxXml = Blockly.Xml.textToDom(toolboxText);
                    success(toolboxXml);
                }
            });
            return;
        } else if (settings.toolboxXML.id) {
            var toolboxText = document.getElementById(settings.toolboxXML.id).outerHTML;
            toolboxText = toolboxText.replace(/{(\w+)}/g,
                function(m, p1) {
                    return MSG[p1]
                });
            var toolboxXml = Blockly.Xml.textToDom(toolboxText);
            success(toolboxXml);
            return;
        }
        error();
    }

    var onResize = function() {
        var bBox = {
            height: content_area.height(),
            width: content_area.width(),
            x: content_area.offset().left,
            y: content_area.offset().top
        }
        $('.' + settings.classBlocklyCodeContent).each(function(index, el) {
            $(this).css({
                top: 0 + 'px',
                left: bBox.x + 'px',
                height: bBox.height + 'px',
                width: bBox.width + 'px',
                overflow: 'hidden',
                marginBottom: 0
            });
        });
    }

    var setCodeType = function(codeType) {
        onResize();
        selectedCodeType = codeType;
        

        // 各Contentの表示切替
        $('.' + settings.classBlocklyCodeContent).each(function(index, el) {
            $(this).css('visibility', 'hidden');
        });
        $('#content_' + codeType).css('visibility', 'visible');

        // Blocklyの表示非表示
        if (codeType == 'blocks') {
            workspace.setVisible(true);
        } else {
            workspace.setVisible(false);
        }

        Blockly.svgResize(workspace);
        renderContent();
    }

    var renderContent = function() {
        if (selectedCodeType == "javascript") {
            var code = Blockly.JavaScript.workspaceToCode(workspace);
            $('#content_javascript').html(code);
            if (typeof blocklyPrettyPrintOne == 'function') {
                code = blocklyPrettyPrintOne(code, 'js');
                $('#content_javascript').html(code);
            }

        } else if (selectedCodeType == "xml") {
            var xmlDom = Blockly.Xml.workspaceToDom(workspace);
            var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
            $('#content_xml').val(xmlText);
        }
    };

    $(window).on('resize', function() {
        onResize();
    });

    init();

    this.show = function(codeType) {
        setCodeType(codeType);
    }
    this.resize = function(){
        setCodeType('blocks');
        onResize();
        Blockly.svgResize(workspace);
    }
    this.hide = function(){
        workspace.setVisible(false);
    }
    this.getXML = function(){
        var xmlDom = Blockly.Xml.workspaceToDom(workspace);
        return Blockly.Xml.domToPrettyText(xmlDom);
    }
    this.setXML = function(xmlText){
        var xml = Blockly.Xml.textToDom(xmlText);
        Blockly.Xml.domToWorkspace(xml, workspace);
    }

    return this;
};
