// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  Application
} from 'phosphide/lib/core/application';

import {
  Widget
} from 'phosphor-widget';


/**
 * The about page extension.
 */
export
const aboutExtension = {
  id: 'jupyter.extensions.about',
  activate: activateAbout
};


function activateAbout(app: Application): void {
  let widget = new Widget();
  let commandId = 'about-jupyterlab:show';
  var location = window.location.pathname;
  var path = location.substring(0, location.lastIndexOf("/"));
  var directoryName = path.substring(path.lastIndexOf("/")+1);
  widget.id = 'about-jupyterlab';
  widget.title.text = 'About';
  widget.title.closable = true;
  widget.addClass('fullPage-about-class');
  console.log("~" + widget.node.classList + "~");
  console.log("!" + widget.node.outerHTML + "!");
  console.log("*" + directoryName + "*");

  widget.node.innerHTML = `<iframe src="lab/aboutPage.html" style="height: 100%; width: 100%;"></iframe>`;
  widget.node.style.overflowY = 'auto';
  app.commands.add([{
    id: commandId,
    handler: () => {
      if (!widget.isAttached) app.shell.addToMainArea(widget);
      app.shell.activateMain(widget.id);
    }
  }]);

  app.palette.add([{
    command: commandId,
    text: 'About JupyterLab',
    category: 'Help'
  }]);

  app.shell.addToMainArea(widget);
}
