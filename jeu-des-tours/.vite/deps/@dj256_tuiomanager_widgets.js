import {
  Point,
  TUIOManager,
  TUIOWidget,
  require_jquery_min
} from "./chunk-7N7OB4OM.js";
import {
  __toESM
} from "./chunk-ZS7NZCD4.js";

// node_modules/@dj256/tuiomanager/widgets/CircularMenu/CircularMenu.js
var import_jquery = __toESM(require_jquery_min(), 1);

// node_modules/@dj256/tuiomanager/src/core/helpers.js
var radToDeg = (rad) => rad * 180 / Math.PI;

// node_modules/@dj256/tuiomanager/widgets/CircularMenu/CircularMenu.js
var CircularMenu = class extends TUIOWidget {
  constructor(tagMenu, rootTree) {
    super(300, 300, 300, 300);
    this.tree = rootTree;
    this.root = rootTree;
    this.rootName = this.tree.name;
    this._domElem = (0, import_jquery.default)("<div>").attr("class", "selector");
    this._domElem.append((0, import_jquery.default)("<ul>").attr("class", "ulmenu")).css("z-index", 2147483647).css("top", "300px").css("left", "300px");
    this.zIndex = 2147483647;
    this.angleStart = -360;
    this.menuItemCoord = [];
    this._lastTagsValues = {};
    this.nbItems = 0;
    this.idTagMenu = tagMenu;
    this.backItem = (0, import_jquery.default)("<li>").attr("class", "limenu").append(
      (0, import_jquery.default)("<input>").attr("id", `c ${this.nbItems}`).attr("type", "checkbox"),
      (0, import_jquery.default)("<label>").attr("for", `c ${this.nbItems}`).append(
        (0, import_jquery.default)("<img>").attr(
          "src",
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI2LjY3NiAyNi42NzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI2LjY3NiAyNi42NzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNMjYuMTA1LDIxLjg5MWMtMC4yMjksMC0wLjQzOS0wLjEzMS0wLjUyOS0wLjM0NmwwLDBjLTAuMDY2LTAuMTU2LTEuNzE2LTMuODU3LTcuODg1LTQuNTljLTEuMjg1LTAuMTU2LTIuODI0LTAuMjM2LTQuNjkzLTAuMjV2NC42MTNjMCwwLjIxMy0wLjExNSwwLjQwNi0wLjMwNCwwLjUwOGMtMC4xODgsMC4wOTgtMC40MTMsMC4wODQtMC41ODgtMC4wMzNMMC4yNTQsMTMuODE1QzAuMDk0LDEzLjcwOCwwLDEzLjUyOCwwLDEzLjMzOWMwLTAuMTkxLDAuMDk0LTAuMzY1LDAuMjU0LTAuNDc3bDExLjg1Ny03Ljk3OWMwLjE3NS0wLjEyMSwwLjM5OC0wLjEyOSwwLjU4OC0wLjAyOWMwLjE5LDAuMTAyLDAuMzAzLDAuMjk1LDAuMzAzLDAuNTAydjQuMjkzYzIuNTc4LDAuMzM2LDEzLjY3NCwyLjMzLDEzLjY3NCwxMS42NzRjMCwwLjI3MS0wLjE5MSwwLjUwOC0wLjQ1OSwwLjU2MkMyNi4xOCwyMS44OTEsMjYuMTQxLDIxLjg5MSwyNi4xMDUsMjEuODkxeiIvPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4="
        ).css("position", "absolute").css("top", "0").css("bottom", "0").css("right", "0").css("left", "0").css("width", "50%").css("height", "50%").css("color", this.backIconColor).css("margin", "auto")
      ).css("color", this.backIconColor).css("background-color", this.backBackgroundColor)
    );
    this.isHide = false;
  }
  /**
   * ImageWidget's domElem.
   *
   * @returns {HTMLElement} ImageWidget's domElem.
   */
  get domElem() {
    return this._domElem;
  }
  /**
   * Rotate an item of the menu through an angle.
   *
   * @method rotate
   * @param {HTMLElement} li - item of the menu.
   * @param {number} angle - Angle in degrees.
   */
  rotate(li, angle) {
    (0, import_jquery.default)({ d: this.angleStart }).animate(
      { d: angle },
      {
        step: (now) => {
          (0, import_jquery.default)(li).css({ transform: `rotate( ${now}deg)` });
        },
        duration: 1
      }
    );
  }
  /**
   * Rotate an item of the menu through an angle.
   *
   * @method toggleOptions
   * @param {HTMLElement} s - Root of the Dom of the menu.
   */
  toggleOptions(s) {
    (0, import_jquery.default)(s).toggleClass("open");
    const li = (0, import_jquery.default)(s).find("li");
    const deg = (0, import_jquery.default)(s).hasClass("half") ? 180 / (li.length - 1) : 360 / li.length;
    for (let i = 0; i < li.length; i += 1) {
      const d = (0, import_jquery.default)(s).hasClass("half") ? i * deg - 90 : i * deg;
      if ((0, import_jquery.default)(s).hasClass("open")) {
        this.rotate(li[i], d);
      } else {
        this.rotate(li[i], this.angleStart);
      }
    }
  }
  /**
   * Check if TUIOWidget is touched.
   *
   * @method isTouched
   * @param {number} x - Point's abscissa to test.
   * @param {number} y - Point's ordinate to test.
   */
  isTouched(x, y) {
    if (!this.isHide) {
      for (let i = 0; i < this.menuItemCoord.length; i += 1) {
        if (x >= this.menuItemCoord[i].xmin && x <= this.menuItemCoord[i].xmax && y >= this.menuItemCoord[i].ymin && y <= this.menuItemCoord[i].ymax) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Call after a TUIOTouch creation.
   *
   * @protected @method _onTouchCreation
   * @param {TUIOTouch} tuioTouch - A TUIOTouch instance.
   */
  _onTouchCreation(tuioTouch) {
    if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
      this._touches = {
        ...this._touches,
        [tuioTouch.id]: tuioTouch
      };
      this._touches[tuioTouch.id].addWidget(this);
      for (let i = 0; i < this.menuItemCoord.length; i += 1) {
        if (tuioTouch.x >= this.menuItemCoord[i].xmin && tuioTouch.x <= this.menuItemCoord[i].xmax && tuioTouch.y >= this.menuItemCoord[i].ymin && tuioTouch.y <= this.menuItemCoord[i].ymax) {
          if (this.tree.name === this.rootName) {
            this.menuItemTouch(i);
          } else if (i === 0) {
            this.tree = this.tree.parent;
            this.nbItems = 0;
            this.toggleOptions(this.domElem);
            this._domElem.find("ul").empty();
            this.constructMenu();
          } else {
            this.menuItemTouch(i - 1);
          }
          break;
        }
      }
    }
  }
  /**
   * Add a text item to the menu
   *
   * @method addTextItem
   * @param {string} itemName - Item name
   * @param {string} textColor - Text color in hexadecimal
   * @param {string} backgroundColor - Background color in hexadecimal
   */
  addTextItem(itemName, textColor, backgroundColor) {
    this._domElem.find("ul").append(
      (0, import_jquery.default)("<li>").attr("class", "limenu").append(
        (0, import_jquery.default)("<input>").attr("id", `c ${this.nbItems}`).attr("type", "checkbox"),
        (0, import_jquery.default)("<label>").attr("for", `c ${this.nbItems}`).append(
          (0, import_jquery.default)("<div>").text(itemName).css("display", "table-cell").css("vertical-align", "middle").css("color", textColor).css("background-color", backgroundColor).css("max-width", "80px")
        ).css("display", "table")
      )
    );
    this.nbItems += 1;
  }
  /**
   * Add a icon item to the menu
   *
   * @method addIconItem
   * @param {string} iconClass - Icon class
   * @param {string} iconColor - Icon color in hexadecimal
   * @param {string} backgroundColor - Background color in hexadecimal
   */
  addIconItem(iconClass, iconColor, backgroundColor) {
    this.domElem.find("ul").append(
      (0, import_jquery.default)("<li>").attr("class", "limenu").append(
        (0, import_jquery.default)("<input>").attr("id", `c ${this.nbItems}`).attr("type", "checkbox"),
        (0, import_jquery.default)("<label>").attr("for", `c ${this.nbItems}`).append((0, import_jquery.default)("<i>").attr("class", iconClass)).css("color", iconColor).css("line-height", "80px").css("background-color", backgroundColor)
      )
    );
  }
  /**
   * Add back item to the menu
   *
   * @method addBackItem
   */
  addBackItem() {
    this.domElem.find("ul").append(this.backItem);
  }
  /**
   * Set back menu item to an icon
   *
   * @method setBackMenuItemIcon
   * @param {string} iconClass - Icon class
   * @param {string} iconColor - Icon color in hexadecimal
   * @param {string} backgroundColor - Background color in hexadecimal
   */
  setBackMenuItemIcon(iconClass, iconColor, backgroundColor) {
    this.backItem = (0, import_jquery.default)("<li>").append(
      (0, import_jquery.default)("<input>").attr("id", `c ${this.nbItems}`).attr("type", "checkbox"),
      (0, import_jquery.default)("<label>").attr("for", `c ${this.nbItems}`).append((0, import_jquery.default)("<i>").attr("class", iconClass)).css("color", iconColor).css("background-color", backgroundColor)
    );
  }
  /**
   * Set back menu item to a text
   *
   * @method setBackMenuItemIcon
   * @param {string} text - Back text
   * @param {string} textColor - Text color in hexadecimal
   * @param {string} backgroundColor - Background color in hexadecimal
   */
  setBackMenuItemText(text, textColor, backgroundColor) {
    this.backItem = (0, import_jquery.default)("<li>").append(
      (0, import_jquery.default)("<input>").attr("id", `c ${this.nbItems}`).attr("type", "checkbox"),
      (0, import_jquery.default)("<label>").attr("for", `c ${this.nbItems}`).text(text).css("color", textColor).css("background-color", backgroundColor)
    );
  }
  /**
   * Called to construct the menu
   *
   * @method constructMenu
   */
  constructMenu() {
    if (this.tree.name !== this.rootName) {
      this.addBackItem();
    }
    for (let i = 0; i < this.tree.childs.length; i += 1) {
      if (this.tree.childs[i].isIcon) {
        this.addIconItem(
          this.tree.childs[i].icon,
          this.tree.childs[i].color,
          this.tree.childs[i].backgroundcolor
        );
      } else {
        this.addTextItem(
          this.tree.childs[i].name,
          this.tree.childs[i].color,
          this.tree.childs[i].backgroundcol
        );
      }
    }
    this.toggleOptions(this.domElem);
    const li = this.domElem.find("li");
    this.menuItemCoord = [];
    for (let i = 0; i < li.length; i += 1) {
      const x = (0, import_jquery.default)(li[i]).find("label")[0].getBoundingClientRect().left;
      const y = (0, import_jquery.default)(li[i]).find("label")[0].getBoundingClientRect().top;
      const width = (0, import_jquery.default)(li[i]).find("label").width();
      const height = (0, import_jquery.default)(li[i]).find("label").height();
      this.menuItemCoord.push({
        xmin: x,
        ymin: y,
        xmax: x + width,
        ymax: y + height
      });
    }
  }
  /**
   * Called when an item of the menu is touched
   *
   * @method menuItemTouch
   */
  menuItemTouch(index) {
    if (this.tree.childs[index].isLeaf()) {
      this.tree.childs[index].callback();
    } else {
      this.tree = this.tree.childs[index];
      this.nbItems = 0;
      this.toggleOptions(this.domElem);
      this._domElem.find("ul").empty();
      this.constructMenu();
    }
  }
  /**
   * Call after a TUIOTag creation.
   *
   * @protected @method _onTagCreation
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  _onTagCreation(tuioTag) {
    if (tuioTag.id === this.idTagMenu) {
      this._tags = {
        ...this._tags,
        [tuioTag.id]: tuioTag
      };
      this._tags[tuioTag.id].addWidget(this);
      this._lastTagsValues = {
        ...this._lastTagsValues,
        [tuioTag.id]: {
          x: tuioTag.x,
          y: tuioTag.y
        }
      };
      this.nbItems = 0;
      this._domElem.find("ul").empty();
      this.constructMenu();
      this.topSelector = tuioTag.y - this.domElem.height() / 2;
      this.leftSelector = tuioTag.x - this.domElem.width() / 2;
      this.domElem.css("top", this.topSelector);
      this.domElem.css("left", this.leftSelector);
      this._domElem.show();
      this.isHide = false;
      const li = this.domElem.find("li");
      this.menuItemCoord = [];
      for (let i = 0; i < li.length; i += 1) {
        const x = (0, import_jquery.default)(li[i]).find("label")[0].getBoundingClientRect().left;
        const y = (0, import_jquery.default)(li[i]).find("label")[0].getBoundingClientRect().top;
        const width = (0, import_jquery.default)(li[i]).find("label").width();
        const height = (0, import_jquery.default)(li[i]).find("label").height();
        this.menuItemCoord.push({
          xmin: x,
          ymin: y,
          xmax: x + width,
          ymax: y + height
        });
      }
    }
  }
  /**
   * Call after a TUIOTag update.
   *
   * @protected @method _onTagUpdate
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  _onTagUpdate(tuioTag) {
    if (typeof this._lastTagsValues[tuioTag.id] !== "undefined") {
      if (tuioTag.id === this.idTagMenu) {
        const lastTagValue = this._lastTagsValues[tuioTag.id];
        const diffX = tuioTag.x - lastTagValue.x;
        const diffY = tuioTag.y - lastTagValue.y;
        this.topSelector += diffY;
        this.leftSelector += diffX;
        this.domElem.css("top", this.topSelector);
        this.domElem.css("left", this.leftSelector);
        this._domElem.css("transform", `rotate(${radToDeg(tuioTag.angle)}deg)`);
        const li = this.domElem.find("li");
        this.menuItemCoord = [];
        for (let i = 0; i < li.length; i += 1) {
          const x = (0, import_jquery.default)(li[i]).find("label")[0].getBoundingClientRect().left;
          const y = (0, import_jquery.default)(li[i]).find("label")[0].getBoundingClientRect().top;
          const width = (0, import_jquery.default)(li[i]).find("label").width();
          const height = (0, import_jquery.default)(li[i]).find("label").height();
          this.menuItemCoord.push({
            xmin: x,
            ymin: y,
            xmax: x + width,
            ymax: y + height
          });
        }
        this._lastTagsValues = {
          ...this._lastTagsValues,
          [tuioTag.id]: {
            x: tuioTag.x,
            y: tuioTag.y
          }
        };
      }
    }
  }
  /**
   * Call after a TUIOTag deletion.
   *
   * @protected @method _onTagDeletion
   * @param {number/string} tuioTagId - TUIOTag's id to delete.
   */
  _onTagDeletion(tuioTagId) {
    if (typeof this._lastTagsValues[tuioTagId] !== "undefined") {
      super._onTagDeletion(tuioTagId);
      this._domElem.hide();
      this.toggleOptions(this.domElem);
      this.isHide = true;
      this.tree = this.root;
    }
  }
};

// node_modules/@dj256/tuiomanager/widgets/CircularMenu/MenuItem.js
var MenuItem = class {
  constructor(item, backgroundcolor, color, isIcon) {
    this._isIcon = isIcon;
    if (isIcon) {
      this._icon = item;
    } else {
      this._name = item;
    }
    this._backgroundcolor = backgroundcolor;
    this._color = color;
    this._childs = [];
  }
  get name() {
    return this._name;
  }
  get isIcon() {
    return this._isIcon;
  }
  get icon() {
    return this._icon;
  }
  get backgroundcolor() {
    return this._backgroundcolor;
  }
  get color() {
    return this._color;
  }
  get parent() {
    return this._parent;
  }
  get childs() {
    return this._childs;
  }
  get callback() {
    return this._callback;
  }
  addChild(child) {
    child.setParent(this);
    this._childs.push(child);
  }
  getChild(position) {
    return this._childs[position];
  }
  setParent(parent) {
    this._parent = parent;
  }
  isLeaf() {
    return this._childs.length === 0;
  }
  setTouchCallback(callback) {
    this._callback = callback;
  }
};

// node_modules/@dj256/tuiomanager/widgets/ElementWidget/ElementWidget.js
var ElementWidget = class _ElementWidget extends TUIOWidget {
  /**
   * ElementWidget constructor.
   *
   * @constructor
   * @param {number} x - ElementWidget's upperleft coin abscissa.
   * @param {number} y - ElementWidget's upperleft coin ordinate.
   * @param {number} width - ElementWidget's width.
   * @param {number} height - ElementWidget's height.
   * @param {number} initialRotation - Initial Rotation of the Element. Set to 0 of no rotation
   * @param {number} initialScale - Initial Scale of the Element. Set to 1 of no rescale
   */
  constructor(x, y, width, height, initialRotation, initialScale) {
    if (new.target === _ElementWidget) {
      throw new TypeError(
        "ElementWidget is an abstract class. It cannot be instanciated"
      );
    }
    super(x, y, width, height);
    this._width *= initialScale;
    this._height *= initialScale;
    this.idTagMove = "";
    this.idTagDelete = "";
    this.idTagZoom = "";
    this._currentAngle = initialRotation;
    this._lastTouchesValues = {};
    this._lastTagsValues = {};
    this.internX = x;
    this.internY = y;
    this.internWidth = this.width;
    this.internHeight = this.height;
    this.scale = 1;
    _ElementWidget.zIndexGlobal += 1;
    this.zIndex = _ElementWidget.zIndexGlobal;
    this.canMoveTactile = true;
    this.canZoomTactile = true;
    this.canRotateTactile = true;
    this.canDeleteTactile = true;
    this.canMoveTangible = true;
    this.canZoomTangible = true;
    this.canRotateTangible = true;
    this.canDeleteTangible = true;
    this._shouldGoOnTop = true;
    this.isDisabled = false;
    this.tagDuplicate = "";
    this.hasBeenWrapped = false;
  }
  // constructor
  /**
   * ImageWidget's domElem.
   *
   * @returns {HTMLElement} ImageWidget's domElem.
   */
  get domElem() {
    if (!this.hasBeenWrapped) {
      this._domElem.attr("id", this.id);
      this.hasBeenWrapped = true;
    }
    return this._domElem;
  }
  /**
   * @returns {boolean} either the widget goes in first plan after touch
   */
  get shouldGoOnTop() {
    return this._shouldGoOnTop;
  }
  // /**
  //  * @param {boolean} value either the widget goes in first plan after touch
  //  */
  // set shouldGoOnTop(value) {
  //   this._shouldGoOnTop = false;
  // }
  /**
   * Check if TUIOWidget is touched.
   *
   * @method isTouched
   * @param {number} x - Point's abscissa to test.
   * @param {number} y - Point's ordinate to test.
   */
  isTouched(x, y) {
    let onDomElem = document.elementFromPoint(x, y);
    if (onDomElem) {
      let init = onDomElem.id === this.id;
      while (onDomElem.parentElement && !init) {
        onDomElem = onDomElem.parentElement;
        init = init || onDomElem.id === this.id;
      }
      if (init) {
        return true;
      }
    }
    return false;
  }
  /**
   * Call after a TUIOTouch creation.
   *
   * @protected @method _onTouchCreation
   * @param {TUIOTouch} tuioTouch - A TUIOTouch instance.
   */
  _onTouchCreation(tuioTouch) {
    if (!this._isInStack) {
      super._onTouchCreation(tuioTouch);
      if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
        this._lastTouchesValues = {
          ...this._lastTouchesValues,
          [tuioTouch.id]: {
            x: tuioTouch.x,
            y: tuioTouch.y
          }
        };
        this._lastTouchesValues.pinchDistance = 0;
        if (this._lastTouchesValues.scale == null) {
          this._lastTouchesValues.scale = this.scale;
        }
      }
    }
  }
  /**
   * Move ImageWidget.
   *
   * @method moveTo
   * @param {string/number} x - New ImageWidget's abscissa.
   * @param {string/number} y - New ImageWidget's ordinate.
   * @param {number} angle - New ImageWidget's angle.
   */
  moveTo(x, y, angle = null) {
    this.internX = x;
    this.internY = y;
    this._domElem.css("left", `${x}px`);
    this._domElem.css("top", `${y}px`);
    if (angle !== null) {
      this._domElem.css(
        "transform",
        `rotate(${angle}deg) scale(${this.scale})`
      );
    }
  }
  /**
   * Call after a TUIOTouch update.
   *
   * @protected @method _onTouchUpdate
   * @param {TUIOTouch} tuioTouch - A TUIOTouch instance.
   */
  _onTouchUpdate(tuioTouch) {
    if (typeof this._lastTouchesValues[tuioTouch.id] === "undefined")
      return;
    super._onTouchUpdate(tuioTouch);
    if (this.shouldGoOnTop) {
      if (this.zIndex !== _ElementWidget.zIndexGlobal) {
        _ElementWidget.zIndexGlobal += 1;
        this.zIndex = _ElementWidget.zIndexGlobal;
      }
      this._domElem.css("z-index", this.zIndex);
    }
    const touchesWidgets = [];
    const currentTouches = this.touches;
    Object.keys(this.touches).forEach((key) => {
      touchesWidgets.push(currentTouches[key]);
    });
    if (touchesWidgets.length === 1 && this.canMoveTactile) {
      const lastTouchValue = this._lastTouchesValues[tuioTouch.id];
      const diffX = tuioTouch.x - lastTouchValue.x;
      const diffY = tuioTouch.y - lastTouchValue.y;
      const newX = this.internX + diffX;
      const newY = this.internY + diffY;
      this._x = this.x + diffX;
      this._y = this.y + diffY;
      this.moveTo(newX, newY);
      this._lastTouchesValues = {
        ...this._lastTouchesValues,
        [tuioTouch.id]: {
          x: tuioTouch.x,
          y: tuioTouch.y
        }
      };
    } else if (touchesWidgets.length === 2) {
      const touch1 = new Point(touchesWidgets[0].x, touchesWidgets[0].y);
      const touch2 = new Point(touchesWidgets[1].x, touchesWidgets[1].y);
      let newscale = this._lastTouchesValues.scale;
      if (this.canZoomTactile) {
        const c = touch1.distanceTo(touch2);
        if (c > this._lastTouchesValues.pinchDistance) {
          newscale = this._lastTouchesValues.scale * 1.018;
          this._lastTouchesValues.scale = newscale;
        } else if (c < this._lastTouchesValues.pinchDistance) {
          newscale = this._lastTouchesValues.scale * 0.985;
          this._lastTouchesValues.scale = newscale;
        }
        this.scale = newscale;
        this._lastTouchesValues.pinchDistance = c;
      }
      if (this.canRotateTactile) {
        if (!this.lastAngle) {
          this.lastAngle = touch1.angleWith(touch2);
        } else {
          if (this.lastAngle < touch1.angleWith(touch2)) {
            this._currentAngle += touch1.angleWith(touch2) - this.lastAngle;
          } else {
            this._currentAngle -= this.lastAngle - touch1.angleWith(touch2);
          }
          this._currentAngle %= 360;
          this.lastAngle = touch1.angleWith(touch2);
        }
      }
      this._domElem.css("transform", `rotate(360deg) scale(${this.scale})`);
      this._width = this._domElem.width();
      this._height = this._domElem.height();
      this._domElem.css(
        "transform",
        `rotate(${this._currentAngle}deg) scale(${this.scale})`
      );
      this._x = this._domElem.position().left;
      this._y = this._domElem.position().top;
    }
  }
  /**
   * Call after a TUIOTouch deletion.
   *
   * @protected @method _onTouchDeletion
   * @param {number/string} tuioTouchId - TUIOTouch's id to delete.
   */
  _onTouchDeletion(tuioTouchId) {
    super._onTouchDeletion(tuioTouchId);
    if (typeof this._lastTouchesValues[tuioTouchId] !== "undefined") {
      const lastTouchValue = this._lastTouchesValues[tuioTouchId];
      const { x, y } = lastTouchValue;
      if (!this._isInStack) {
        Object.keys(TUIOManager.getInstance()._widgets).forEach((widgetId) => {
          if (TUIOManager.getInstance()._widgets[widgetId].constructor.name === "LibraryStack") {
            if (this.isInBounds(
              TUIOManager.getInstance()._widgets[widgetId],
              x,
              y
            ) && !TUIOManager.getInstance()._widgets[widgetId].isDisabled && TUIOManager.getInstance()._widgets[widgetId].isAllowedElement(
              this
            )) {
              this._isInStack = true;
              TUIOManager.getInstance()._widgets[widgetId].addElementWidget(
                this
              );
              return null;
            }
          }
          return null;
        });
      }
    }
    _ElementWidget.isAlreadyTouched = false;
    this.lastAngle = null;
  }
  /**
   * Call after a TUIOTag creation.
   *
   * @protected @method _onTagCreation
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  _onTagCreation(tuioTag) {
    if (!this._isInStack) {
      super._onTagCreation(tuioTag);
      if (this.isTouched(tuioTag.x, tuioTag.y)) {
        this._lastTagsValues = {
          ...this._lastTagsValues,
          [tuioTag.id]: {
            x: tuioTag.x,
            y: tuioTag.y,
            angle: tuioTag.angle
          }
        };
        this._lastTagsValues.angle = 0;
        if (this._lastTagsValues.scale == null) {
          this._lastTagsValues.scale = this.scale;
        }
      }
    }
  }
  /**
   * Call after a TUIOTag update.
   *
   * @protected @method _onTagUpdate
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  _onTagUpdate(tuioTag) {
    if (typeof this._lastTagsValues[tuioTag.id] === "undefined")
      return;
    super._onTagUpdate(tuioTag);
    if (tuioTag.id === this.idTagDelete && this.canDeleteTangible) {
      this._domElem.remove();
      this.deleteWidget();
    } else if (tuioTag.id === this.idTagMove && this.canMoveTangible) {
      if (this.shouldGoOnTop) {
        if (this.zIndex !== _ElementWidget.zIndexGlobal) {
          _ElementWidget.zIndexGlobal += 1;
          this.zIndex = _ElementWidget.zIndexGlobal;
        }
        this._domElem.css("z-index", this.zIndex);
      }
      const lastTagValue = this._lastTagsValues[tuioTag.id];
      const diffX = tuioTag.x - lastTagValue.x;
      const diffY = tuioTag.y - lastTagValue.y;
      const newX = this.internX + diffX;
      const newY = this.internY + diffY;
      if (this.canRotateTangible) {
        this._currentAngle = radToDeg(tuioTag.angle);
        this.moveTo(newX, newY, this._currentAngle);
      } else {
        this.moveTo(newX, newY);
      }
      this._lastTagsValues = {
        ...this._lastTagsValues,
        [tuioTag.id]: {
          x: tuioTag.x,
          y: tuioTag.y
        }
      };
      this._x = this._domElem.position().left;
      this._y = this._domElem.position().top;
      this._width = this._domElem.width();
      this._height = this._domElem.height();
    } else if (tuioTag.id === this.idTagZoom && this.canZoomTangible) {
      let newscale;
      if (tuioTag.angle > this._lastTagsValues.angle) {
        newscale = this._lastTagsValues.scale * 1.5;
        this.scale = newscale;
        this._lastTagsValues.angle = tuioTag.angle;
        this._domElem.css(
          "transform",
          `rotate(${this._currentAngle}deg) scale(${newscale})`
        );
        this._lastTagsValues.scale = newscale;
      } else if (tuioTag.angle < this._lastTagsValues.angle) {
        newscale = this._lastTagsValues.scale * 0.75;
        this.scale = newscale;
        this._lastTagsValues.angle = tuioTag.angle;
        this._domElem.css(
          "transform",
          `rotate(${this._currentAngle}deg) scale(${newscale})`
        );
        this._lastTagsValues.scale = newscale;
      }
      this._x = this._domElem.position().left;
      this._y = this._domElem.position().top;
      this._width = this._domElem.width();
      this._height = this._domElem.height();
    }
  }
  /**
   * Call after a TUIOTag deletion.
   *
   * @protected @method _onTagDeletion
   * @param {number/string} tuioTagId - TUIOTag's id to delete.
   */
  _onTagDeletion(tuioTagId) {
    super._onTagDeletion(tuioTagId);
  }
  /**
   * Call to enable/disable rotation
   *
   * @method canRotate
   * @param {boolean} canRotateTangible - Enable/disable tangible rotation
   * @param {boolean} canRotateTactile - Enable/disable tactile rotation
   */
  canRotate(canRotateTangible, canRotateTactile) {
    this.canRotateTangible = canRotateTangible;
    this.canRotateTactile = canRotateTactile;
  }
  /**
   * Call to enable/disable rotation
   *
   * @method canMove
   * @param {boolean} canMoveTangible - Enable/disable tangible movement
   * @param {boolean} canMoveTactile - Enable/disable tactile movement
   */
  canMove(canMoveTangible, canMoveTactile) {
    this.canMoveTangible = canMoveTangible;
    this.canMoveTactile = canMoveTactile;
  }
  /**
   * Call to enable/disable rotation
   *
   * @method canZoom
   * @param {boolean} canZoomTangible - Enable/disable tangible zoom
   * @param {boolean} canZoomTactile - Enable/disable tactile zoom
   */
  canZoom(canZoomTangible, canZoomTactile) {
    this.canZoomTangible = canZoomTangible;
    this.canZoomTactile = canZoomTactile;
  }
  /**
   * Call to enable/disable rotation
   *
   * @method canDelete
   * @param {boolean} canDeleteTangible - Enable/disable tangible delete
   * @param {boolean} canDeleteTactile - Enable/disable tactile delete
   */
  canDelete(canDeleteTangible, canDeleteTactile) {
    this.canDeleteTangible = canDeleteTangible;
    this.canDeleteTactile = canDeleteTactile;
  }
  /**
   * Call to enable/disable rotation
   *
   * @method disable
   * @param {boolean} isDisabled - Enable/disable interaction with the widget
   */
  disable(isDisabled) {
    this.isDisabled = isDisabled;
  }
  /**
   * Return if this ElementWidget position is in the bounding box of a LibraryStack
   *
   * @method isInBounds
   * @param {LibraryStack} libStack - Libstack to compare
   * @param {number} x - X coordinates of the touch deletion
   * @param {number} y - Y coordinates of the touch deletion
   */
  isInBounds(libStack, x, y) {
    return x >= libStack._x && x <= libStack._x + libStack._width && y >= libStack._y && y <= libStack._y + libStack._height;
  }
  /**
   * Set the move tag
   *
   * @method setTagMove
   * @param {string} tagMove - Move tag id
   */
  setTagMove(tagMove) {
    this.idTagMove = tagMove;
  }
  /**
   * Set the move tag
   *
   * @method setTagZoom
   * @param {string} tagZoom - Zoom tag id
   */
  setTagZoom(tagZoom) {
    this.idTagZoom = tagZoom;
  }
  /**
   * Set the move tag
   *
   * @method setTagDelete
   * @param {string} tagDelete - Delete tag id
   */
  setTagDelete(tagDelete) {
    this.idTagDelete = tagDelete;
  }
  /**
   * Set the move tag
   *
   * @method setTagDuplicate
   * @param {string} tagDuplicate - Duplicate tag id
   */
  setTagDuplicate(tagDuplicate) {
    this.tagDuplicate = tagDuplicate;
  }
};
ElementWidget.zIndexGlobal = 0;

// node_modules/@dj256/tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget.js
var import_jquery2 = __toESM(require_jquery_min(), 1);
var ImageElementWidget = class _ImageElementWidget extends ElementWidget {
  /**
   * ImageElementWidget constructor.
   *
   * @constructor
   * @param {number} x - ImageElementWidget's upperleft coin abscissa.
   * @param {number} y - ImageElementWidget's upperleft coin ordinate.
   * @param {number} width - ImageElementWidget's width.
   * @param {number} height - ImageElementWidget's height.
   * @param {number} initialRotation - Initial rotation. Set to 0 of no rotation
   * @param {number} initialScale - Initial scale. Set to 1 of no rescale
   * @param {string} src - Source of the image
   */
  constructor(x, y, width, height, initialRotation, initialScale, src) {
    super(x, y, width, height, initialRotation, initialScale);
    this.src = src;
    this._domElem = (0, import_jquery2.default)("<img>");
    this._domElem.attr("src", src);
    this._domElem.css("width", `${this.width}px`);
    this._domElem.css("height", `${this.height}px`);
    this._domElem.css("position", "absolute");
    this._domElem.css("z-index", `${this.zIndex}`);
    this._domElem.css("left", `${x}px`);
    this._domElem.css("top", `${y}px`);
    this._domElem.css("transform", `rotate(${initialRotation}deg)`);
    this._domElem.css("transform-origin", `scale(${initialScale})`);
    this.hasDuplicate = false;
  }
  // constructor
  /**
   * Call after a TUIOTag update.
   *
   * @protected @method _onTagUpdate
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  _onTagUpdate(tuioTag) {
    if (typeof this._lastTagsValues[tuioTag.id] === "undefined")
      return;
    super._onTagUpdate(tuioTag);
    if (tuioTag.id === this.tagDuplicate && !this.hasDuplicate) {
      const clone = new _ImageElementWidget(
        this.x + 10,
        this.y + 10,
        this.width,
        this.height,
        this._currentAngle,
        1,
        this.src,
        this.tagMove,
        this.tagDelete,
        this.tagZoom,
        this.tagDuplicate
      );
      TUIOManager.getInstance().addWidget(clone);
      this._domElem.parent().append(clone.domElem);
      this.hasDuplicate = true;
    }
  }
  /**
   * Call after a TUIOTag deletion.
   *
   * @protected @method _onTagDeletion
   * @param {number/string} tuioTagId - TUIOTag's id to delete.
   */
  _onTagDeletion(tuioTagId) {
    if (typeof this._lastTagsValues[tuioTagId] === "undefined")
      return;
    delete this._lastTagsValues[tuioTagId];
    super._onTagDeletion(tuioTagId);
    if (tuioTagId === this.tagDuplicate) {
      this.hasDuplicate = false;
    }
  }
};

// node_modules/@dj256/tuiomanager/widgets/ElementWidget/VideoElementWidget/VideoElementWidget.js
var import_jquery3 = __toESM(require_jquery_min(), 1);
var VideoElementWidget = class _VideoElementWidget extends ElementWidget {
  /**
   * VideoElementWidget constructor.
   *
   * @constructor
   * @param {number} x - VideoElementWidget's upperleft coin abscissa.
   * @param {number} y - VideoElementWidget's upperleft coin ordinate.
   * @param {number} width - VideoElementWidget's width.
   * @param {number} height - VideoElementWidget's height.
   * @param {number} initialRotation - VideoElementWidget's initial rotation.
   * @param {number} initialScale - VideoElementWidget's initial scale.
   * @param {string} src - VideoElementWidget's src.
   */
  constructor(x, y, width, height, initialRotation, initialScale, src) {
    super(x, y, width, height, initialRotation, initialScale);
    this._domElem = (0, import_jquery3.default)("<div>");
    this.src = src;
    this._domElem.append(
      (0, import_jquery3.default)("<video>").attr("src", src).css("width", "100%").css("position", "absolute"),
      (0, import_jquery3.default)("<div>").css("width", "100%").css("height", "64px").css("id", "playbutton").css("position", "absolute").css("top", "0").css("bottom", "0").css("right", "0").css("left", "0").css("margin", "auto").css(
        "background",
        'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDQ5Ni4xNTggNDk2LjE1OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDk2LjE1OCA0OTYuMTU4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBzdHlsZT0iZmlsbDojMzJCRUE2OyIgZD0iTTQ5Ni4xNTgsMjQ4LjA4NWMwLTEzNy4wMjEtMTExLjA3LTI0OC4wODItMjQ4LjA3Ni0yNDguMDgyQzExMS4wNywwLjAwMiwwLDExMS4wNjIsMCwyNDguMDg1DQoJYzAsMTM3LjAwMiwxMTEuMDcsMjQ4LjA3MSwyNDguMDgzLDI0OC4wNzFDMzg1LjA4OCw0OTYuMTU1LDQ5Ni4xNTgsMzg1LjA4Niw0OTYuMTU4LDI0OC4wODV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTM3MC44MDUsMjM1LjI0MkwxOTUuODU2LDEyNy44MThjLTQuNzc2LTIuOTM0LTExLjA2MS0zLjA2MS0xNS45NTEtMC4zMjINCgljLTQuOTc5LDIuNzg1LTguMDcxLDguMDU5LTguMDcxLDEzLjc2MnYyMTRjMCw1LjY5MywzLjA4MywxMC45NjMsOC4wNDYsMTMuNzUyYzIuMzUzLDEuMzIsNS4wMjQsMi4wMiw3LjcyNSwyLjAyDQoJYzIuODk3LDAsNS43MzQtMC43OTcsOC4yMDUtMi4zMDNsMTc0Ljk0Ny0xMDYuNTc2YzQuNjU3LTIuODM2LDcuNTU2LTcuOTg2LDcuNTY1LTEzLjQ0DQoJQzM3OC4zMzIsMjQzLjI1OCwzNzUuNDUyLDIzOC4wOTYsMzcwLjgwNSwyMzUuMjQyeiIvPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=") center center no-repeat'
      )
    );
    this._domElem.css("width", `${this.width}px`).css("height", `${this.height}px`).css("position", "absolute").css("left", `${x}px`).css("top", `${y}px`).css("z-index", `${this.zIndex}`).css("transform", `rotate(${initialRotation}deg)`).css("transform-origin", `scale(${initialScale})`);
    this.idTagPlayPause = "";
    this.isPlaying = false;
    this.canPlayPauseTangible = true;
    this.canPlayPauseTactile = true;
    this.canPlayPause = true;
  }
  // constructor
  /**
   * Call after a TUIOTouch creation.
   *
   * @protected @method _onTouchCreation
   * @param {TUIOTouch} tuioTouch - A TUIOTouch instance.
   */
  _onTouchCreation(tuioTouch) {
    super._onTouchCreation(tuioTouch);
    this.timeInitTouchVideo = Date.now();
    this.touchInitX = tuioTouch.x;
    this.touchInitY = tuioTouch.y;
  }
  /**
   * Call after a TUIOTouch update.
   *
   * @protected @method _onTouchUpdate
   * @param {TUIOTouch} tuioTouch - A TUIOTouch instance.
   */
  _onTouchUpdate(tuioTouch) {
    super._onTouchUpdate(tuioTouch);
    if (typeof this._lastTouchesValues[tuioTouch.id] !== "undefined") {
      const touchesWidgets = [];
      const currentTouches = this.touches;
      Object.keys(this.touches).forEach((key) => {
        touchesWidgets.push(currentTouches[key]);
      });
      const timeUpdateTouch = Date.now();
      const deltaX = Math.abs(tuioTouch.x - this.touchInitX);
      const deltaY = Math.abs(tuioTouch.y - this.touchInitY);
      const deltaT = (timeUpdateTouch - this.timeInitTouchVideo) / 1e3;
      if (touchesWidgets.length === 1 && this.canPlayPause && deltaT > 0.5 && deltaX < 10 && deltaY < 10) {
        this.canPlayPause = false;
        this.playPauseVideo();
        super._onTouchDeletion(tuioTouch.id);
        this.canRemove = false;
      }
    }
  }
  /**
   * Call after a TUIOTouch update.
   *
   * @protected @method _onTouchDeletion
   * @param {string} tuioTouchId - A TUIOTouch instance.
   */
  _onTouchDeletion(tuioTouchId) {
    super._onTouchDeletion(tuioTouchId);
    this.canPlayPause = true;
  }
  /**
   * Call after a TUIOTag creation.
   *
   * @protected  @method _onTagCreation
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  _onTagCreation(tuioTag) {
    super._onTagCreation(tuioTag);
    if (this.isTouched(tuioTag.x, tuioTag.y)) {
      if (tuioTag.id === this.idTagPlayPause && this.canPlayPauseTangible) {
        this.playPauseVideo();
      } else if (tuioTag.id === this.tagDuplicate) {
        const clone = new _VideoElementWidget(
          this.x + 10,
          this.y + 10,
          this.width,
          this.height,
          this._currentAngle,
          1,
          this.src,
          this.tagMove,
          this.tagDelete,
          this.tagZoom,
          this.tagDuplicate,
          this.idTagPlayPause
        );
        TUIOManager.getInstance().addWidget(clone);
        this._domElem.parent().append(clone.domElem);
      }
    }
  }
  /**
   * Change the state to play or pause (depending of the state before) of the video
   *
   * @method playPauseVideo
   */
  playPauseVideo() {
    this._domElem.children().first().on("ended", () => {
      this._domElem.children().eq(1).show();
    });
    if (this.isPlaying) {
      this._domElem.children().first()[0].pause();
      this._domElem.children().eq(1).show();
      this.isPlaying = false;
    } else {
      this._domElem.children().first()[0].play();
      this._domElem.children().eq(1).hide();
      this.isPlaying = true;
    }
  }
  /**
   * Call to enable/disable play/pause
   *
   * @method canPlayPause
   * @param {boolean} canPlayPauseTangible - Enable/disable tangible play/pause
   * @param {boolean} canPlayPauseTactile - Enable/disable tactile play/pause
   */
  canPlayPause(canPlayPauseTangible, canPlayPauseTactile) {
    this.canPlayPauseTangible = canPlayPauseTangible;
    this.canPlayPauseTactile = canPlayPauseTactile;
  }
  /**
   * Set the play/pause tag
   *
   * @method setTagPlayPause
   * @param {string} tagPlayPause - Tag ID
   */
  setTagPlayPause(tagPlayPause) {
    this.idTagPlayPause = tagPlayPause;
  }
};

// node_modules/@dj256/tuiomanager/widgets/Library/LibraryBar/LibraryBar.js
var LibraryBar = class extends TUIOWidget {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }
  /**
   * ImageWidget's domElem.
   *
   * @returns {HTMLElement} ImageWidget's domElem.
   */
  get domElem() {
    return this._domElem;
  }
  /**
   * Check if TUIOWidget is touched.
   *
   * @method isTouched
   * @param {number} x - Point's abscissa to test.
   * @param {number} y - Point's ordinate to test.
   */
  isTouched(x, y) {
    return x >= this.x && x <= this.width + this.x && y >= this.y && y <= this.y + this.height && !this.isHide;
  }
  /**
   * Call after a TUIOTouch creation.
   *
   * @protected @method _onTouchCreation
   * @param {TUIOTouch} tuioTouch - A TUIOTouch instance.
   */
  _onTouchCreation(tuioTouch) {
    super._onTouchCreation(tuioTouch);
  }
  /**
   * Call after a TUIOTouch update.
   *
   * @protected @method _onTouchUpdate
   * @param {TUIOTouch} tuioTouch - A TUIOTouch instance.
   */
  _onTouchUpdate(tuioTouch) {
    super._onTouchUpdate(tuioTouch);
  }
  /**
   * Call after a TUIOTag creation.
   *
   * @protected @method _onTagCreation
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  _onTagCreation(tuioTag) {
    super._onTagCreation(tuioTag);
  }
  /**
   * Call after a TUIOTag update.
   *
   * @protected @method #onTagUpdate
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  _onTagUpdate(tuioTag) {
    super._onTagUpdate(tuioTag);
  }
  /**
   * Call after a TUIOTag deletion.
   *
   * @protected @method _onTagDeletion
   * @param {number/string} tuioTagId - TUIOTag's id to delete.
   */
  _onTagDeletion(tuioTagId) {
    super._onTagDeletion(tuioTagId);
  }
};

// node_modules/@dj256/tuiomanager/widgets/Library/LibraryStack/LibraryStack.js
var import_jquery4 = __toESM(require_jquery_min(), 1);
var LibraryStack = class extends TUIOWidget {
  /**
   * Constructor LibraryStack
   *
   * @param {number} x - X position of the stack
   * @param {number} y - Y position of the stack
   * @param {number} size - Size of the stack
   * @param {string} stackTitle - Title of the stack
   * @param {string} color - Color in Hexadecimal of the border or background of the stack
   * @param {boolean} isFull - Define if the stack has border or a full background color
   * @param {string[]} allowcontentsArray - Array of allowed ElementWidget to fill the stack. Set an empty array to accept all kind of ElementWidget
   */
  constructor(x, y, size, stackTitle, color, isFull, allowcontentsArray) {
    super(x, y, size, size);
    this._lastTouchesValues = {};
    this._lastTagsValues = {};
    this._stackList = [];
    this.zIndexElem = -2e7;
    this._domElem = (0, import_jquery4.default)("<div>").css("width", `${size}px`).css("height", `${size}px`).css("position", "absolute").css("left", `${x}px`).css("top", `${y}px`).css("z-index", -1);
    this.stackTitleTop = (0, import_jquery4.default)("<div>").text(stackTitle).css("margin-top", "-40px").css("text-align", "center").css("width", `${size}`).css("max-width", `${size}`).css("white-space", "nowrap").css("height", "40px").css("font-size", "100px");
    this.stackTitleBottom = (0, import_jquery4.default)("<div>").text(stackTitle).css("position", "absolute").css("bottom", 0).css("margin-bottom", "-60px").css("text-align", "center").css("width", `${size}`).css("max-width", `${size}`).css("white-space", "nowrap").css("transform", "rotate(180deg)").css("height", "40px").css("font-size", "100px");
    this.stackDiv = (0, import_jquery4.default)('<div class="library-stack"> </div>').css("width", `${size}px`).css("height", `${size}px`).css("position", "absolute").css("z-index", -1).css("overflow", "hidden");
    if (isFull) {
      this.stackDiv.css("background-color", color);
    } else {
      this.stackDiv.css("border", `solid 10px ${color}`);
    }
    this._domElem.append(this.stackTitleTop);
    this._domElem.append(this.stackDiv);
    this._domElem.append(this.stackTitleBottom);
    this.zIndex = -1;
    this.allowcontentsArray = allowcontentsArray;
    this.elementInfoArray = [];
    this.upperIndex = 0;
    this.canRemove = true;
    this._currentAngle = 0;
    this.showTag = "";
    this.scale = 1;
  }
  /**
   * LibraryStack's domElem.
   *
   * @returns {HTMLElement} ImageWidget's domElem.
   */
  get domElem() {
    return this._domElem;
  }
  /**
   * Check if LibraryStack is touched.
   *
   * @method isTouched
   * @param {number} x - Point's abscissa to test.
   * @param {number} y - Point's ordinate to test.
   */
  isTouched(x, y) {
    this._domElem.css("transform", `rotate(360deg) scale(${this.scale})`);
    const nx = this._domElem[0].getBoundingClientRect().left;
    const ny = this._domElem[0].getBoundingClientRect().top;
    const width = this._domElem.width();
    const height = this._domElem.height();
    const ox = nx + width / 2;
    const oy = ny + height / 2;
    const p = new Point(x, y);
    p.rotate(360 - this._currentAngle, ox, oy);
    this._domElem.css(
      "transform",
      `rotate(${this._currentAngle}deg) scale(${this.scale})`
    );
    return p.x >= nx && p.x <= nx + width && p.y >= ny && p.y <= ny + height && !this.isDisabled;
  }
  /**
   * Call after a TUIOTouch creation.
   *
   * @protected @method _onTouchCreation
   * @param {TUIOTouch} tuioTouch - A TUIOTouch instance.
   */
  _onTouchCreation(tuioTouch) {
    super._onTouchCreation(tuioTouch);
    if (this.isTouched(tuioTouch.x, tuioTouch.y)) {
      this._lastTouchesValues = {
        ...this._lastTouchesValues,
        [tuioTouch.id]: {
          x: tuioTouch.x,
          y: tuioTouch.y
        }
      };
      if (this._lastTouchesValues.scale == null) {
        this._lastTouchesValues.scale = 1;
      }
      this.touchedTimestamp = Date.now();
      this.touchedInitX = tuioTouch.x;
      this.touchedInitY = tuioTouch.y;
    }
  }
  /**
   * Set the size of the Stack title to fit correctly
   *
   * @method onTouchCreation
   * @param {HTMLElement} element - DOM Elem of the titles
   */
  resizeFont(element) {
    while (element.scrollWidth > element.offsetWidth || element.scrollHeight > element.offsetHeight) {
      const newSize = parseFloat((0, import_jquery4.default)(element).css("font-size").slice(0, -2)) * 0.95;
      (0, import_jquery4.default)(element).css("font-size", `${newSize}px`);
    }
  }
  /**
   * Call to add the stack to a DOM
   * @param {HTMLElement} parent - DOMElem to put the libraryStack
   */
  addTo(parent) {
    super.addTo(parent);
    this.resizeFont(this.stackTitleTop.get(0));
    this.resizeFont(this.stackTitleBottom.get(0));
  }
  /**
   * Call after a TUIOTouch update.
   *
   * @protected @method _onTouchUpdate
   * @param {TUIOTouch} tuioTouch - A TUIOTouch instance.
   */
  _onTouchUpdate(tuioTouch) {
    if (typeof this._lastTouchesValues[tuioTouch.id] !== "undefined") {
      const touchesWidgets = [];
      const currentTouches = this.touches;
      Object.keys(this.touches).forEach((key) => {
        touchesWidgets.push(currentTouches[key]);
      });
      const updateTouch = Date.now();
      if (touchesWidgets.length === 1) {
        const deltaX = Math.abs(tuioTouch.x - this.touchedInitX);
        const deltaY = Math.abs(tuioTouch.y - this.touchedInitY);
        if ((updateTouch - this.touchedTimestamp) / 1e3 > 0.5 && deltaX < 10 && deltaY < 10) {
          if (this.canRemove) {
            const removedElem = this.removeElementWidget(tuioTouch);
            super._onTouchDeletion(tuioTouch.id);
            removedElem.onTouchCreation(tuioTouch);
            this.canRemove = false;
          }
        } else {
          const lastTouchValue = this._lastTouchesValues[tuioTouch.id];
          const diffX = tuioTouch.x - lastTouchValue.x;
          const diffY = tuioTouch.y - lastTouchValue.y;
          const newX = this._x + diffX;
          const newY = this._y + diffY;
          for (let i = 0; i < this._stackList.length; i += 1) {
            this._stackList[i].internX = newX;
            this._stackList[i].internY = newY;
          }
          this.moveTo(newX, newY);
          this._lastTouchesValues = {
            ...this._lastTouchesValues,
            [tuioTouch.id]: {
              x: tuioTouch.x,
              y: tuioTouch.y
            }
          };
        }
      } else if (touchesWidgets.length === 2) {
        const touch1 = new Point(touchesWidgets[0].x, touchesWidgets[0].y);
        const touch2 = new Point(touchesWidgets[1].x, touchesWidgets[1].y);
        let newscale = this._lastTouchesValues.scale;
        const c = touch1.distanceTo(touch2);
        if (c > this._lastTouchesValues.pinchDistance) {
          newscale = this._lastTouchesValues.scale * 1.018;
          this._lastTouchesValues.scale = newscale;
        } else if (c < this._lastTouchesValues.pinchDistance) {
          newscale = this._lastTouchesValues.scale * 0.985;
          this._lastTouchesValues.scale = newscale;
        }
        this.scale = newscale;
        this._lastTouchesValues.pinchDistance = c;
        if (!this.lastAngle) {
          this.lastAngle = touch1.angleWith(touch2);
        } else {
          if (this.lastAngle < touch1.angleWith(touch2)) {
            this._currentAngle += touch1.angleWith(touch2) - this.lastAngle;
          } else {
            this._currentAngle -= this.lastAngle - touch1.angleWith(touch2);
          }
          this._currentAngle %= 360;
          this.lastAngle = touch1.angleWith(touch2);
        }
        this._domElem.css("transform", `rotate(360deg) scale(${this.scale})`);
        this._domElem.css(
          "transform",
          `rotate(${this._currentAngle}deg) scale(${this.scale})`
        );
      }
    }
  }
  /**
   * Call after a TUIOTouch deletion.
   *
   * @protected @method _onTouchDeletion
   * @param {number/string} tuioTouchId - TUIOTouch's id to delete.
   */
  _onTouchDeletion(tuioTouchId) {
    super._onTouchDeletion(tuioTouchId);
    if (typeof this._lastTouchesValues[tuioTouchId] !== "undefined") {
      const endTouch = Date.now();
      const delta = endTouch - this.touchedTimestamp;
      if (delta / 1e3 <= 0.5) {
        if (this._stackList.length > 0) {
          this.browseStack();
        }
      }
      this.canRemove = true;
      this.lastAngle = null;
    }
  }
  /**
   * Call after a TUIOTag creation.
   *
   * @protected @method _onTagCreation
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  _onTagCreation(tuioTag) {
    if (tuioTag.id === this.showTag) {
      this._tags = {
        ...this._tags,
        [tuioTag.id]: tuioTag
      };
      this._tags[tuioTag.id].addWidget(this);
      this._lastTagsValues = {
        ...this._lastTagsValues,
        [tuioTag.id]: {
          x: tuioTag.x,
          y: tuioTag.y
        }
      };
      if (this.tangibleMode === 0) {
        this._x = tuioTag.x - this.width / 2;
        this._y = tuioTag.y + 80;
      } else if (this.tangibleMode === 1) {
        this._x = tuioTag.x + 80;
        this._y = tuioTag.y - this.height / 2;
      } else if (this.tangibleMode === 2) {
        this._x = tuioTag.x - (this.width - 80);
        this._y = tuioTag.y - this.height / 2;
      } else if (this.tangibleMode === 3) {
        this._x = tuioTag.x - this.width / 2;
        this._y = tuioTag.y - (this.height - 80);
      } else {
        this._x = tuioTag.x;
        this._y = tuioTag.y;
      }
      this.moveTo(this.x, this.y, radToDeg(tuioTag.angle));
      this.show();
    }
  }
  /**
   * Call after a TUIOTag update.
   *
   * @protected  @method _onTagUpdate
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  _onTagUpdate(tuioTag) {
    if (typeof this._lastTagsValues[tuioTag.id] !== "undefined") {
      const lastTagValue = this._lastTagsValues[tuioTag.id];
      const diffX = tuioTag.x - lastTagValue.x;
      const diffY = tuioTag.y - lastTagValue.y;
      const newX = this.x + diffX;
      const newY = this.y + diffY;
      this.moveTo(newX, newY, radToDeg(tuioTag.angle));
      this._lastTagsValues = {
        ...this._lastTagsValues,
        [tuioTag.id]: {
          x: tuioTag.x,
          y: tuioTag.y
        }
      };
    }
  }
  /**
   * Call after a TUIOTag deletion.
   *
   * @protected @method _onTagDeletion
   * @param {string} tuioTagId - A TUIOTag id.
   */
  _onTagDeletion(tuioTagId) {
    if (typeof this._lastTagsValues[tuioTagId] !== "undefined") {
      super._onTagDeletion(tuioTagId);
      this.hide();
      this.isDisabled = true;
    }
  }
  /**
   * Move ImageWidget.
   *
   * @method moveTo
   * @param {string/number} x - New ImageWidget's abscissa.
   * @param {string/number} y - New ImageWidget's ordinate.
   * @param {number} angle - New ImageWidget's angle.
   */
  moveTo(x, y, angle = null) {
    this._x = x;
    this._y = y;
    this._domElem.css("left", `${x}px`);
    this._domElem.css("top", `${y}px`);
    if (angle !== null) {
      this._domElem.css(
        "transform",
        `rotate(${angle}deg) scale(${this.scale})`
      );
    }
  }
  /**
   * Check if the elementwidget is allowed to be placed in this LibraryStack
   * @param {ElementWidget} elementWidget - Elementwidget to add
   */
  isAllowedElement(elementWidget) {
    return this.allowcontentsArray.indexOf(elementWidget.constructor.name) !== -1 || this.allowcontentsArray.length === 0;
  }
  /**
   * Add an ElementWidget to this LibraryStack
   * @param {ElementWidget} elementWidget  - Elementwidget to add
   */
  addElementWidget(elementWidget) {
    let elementToAdd;
    if (this.isAllowedElement(elementWidget)) {
      elementToAdd = elementWidget;
      elementToAdd._domElem.css("transform", "rotate(360deg)");
      const elemWidth = elementToAdd._domElem.width();
      const elemHeight = elementToAdd._domElem.height();
      this.elementInfoArray.push({
        x: elementToAdd.x,
        y: elementToAdd.y,
        width: elemWidth,
        height: elemHeight,
        angle: elementToAdd._currentAngle,
        scale: elementToAdd.scale,
        zIndex: elementToAdd.zIndex
      });
      elementToAdd._x = this._x;
      elementToAdd._y = this._y;
      this.zIndexElem += 1;
      elementToAdd.zIndex = this.zIndexElem;
      elementToAdd._isInStack = true;
      elementToAdd.disable(true);
      let newWidth;
      let newHeight;
      if (elemWidth > elemHeight) {
        newWidth = this.width - 50;
        newHeight = elemHeight * newWidth / elemWidth;
      } else {
        newHeight = this.width - 50;
        newWidth = elemWidth * newHeight / elemHeight;
      }
      const newLeft = this.width / 2 - newWidth / 2;
      const newTop = this.height / 2 - newHeight / 2;
      elementToAdd._domElem.addClass("stack-element").css("left", newLeft).css("top", newTop).css("overflow", "hidden").css("width", newWidth).css("height", newHeight);
      const angle = this._stackList.length * 10;
      elementToAdd._currentAngle = angle;
      elementToAdd.scale = 1;
      elementToAdd._domElem.css("transform", `rotate(${angle}deg)`).appendTo(this.stackDiv);
      this._stackList.push(elementToAdd);
    }
  }
  /**
   * Remove the top ElementWidget of this LibraryStack
   * @param {TUIOTouch} tuioTouch - TUIOTouch Instance
   */
  removeElementWidget(tuioTouch) {
    const upperIndex = this.getUpperIndex();
    const elementToRemove = this._stackList[upperIndex];
    const elemenToRemoveInfos = this.elementInfoArray[upperIndex];
    elementToRemove.disable(false);
    elementToRemove._width = elemenToRemoveInfos.width;
    elementToRemove._height = elemenToRemoveInfos.height;
    elementToRemove._currentAngle = elemenToRemoveInfos.angle;
    elementToRemove.scale = elemenToRemoveInfos.scale;
    elementToRemove.zIndex = elemenToRemoveInfos.zIndex;
    elementToRemove._domElem.css("z-index", elemenToRemoveInfos.zIndex).css("top", tuioTouch.y - elementToRemove.height / 2).css("left", tuioTouch.x - elementToRemove.width / 2).css("width", elemenToRemoveInfos.width).css("height", elemenToRemoveInfos.height).css(
      "transform",
      `rotate(${elemenToRemoveInfos.angle}deg) scale(${elemenToRemoveInfos.scale})`
    ).removeClass("stack-element").appendTo(this._domElem.parent().parent());
    elementToRemove._isInStack = false;
    this._stackList.splice(upperIndex, 1);
    this.elementInfoArray.splice(upperIndex, 1);
    return elementToRemove;
  }
  isInBounds(element) {
    return element.x >= this.x && element.x <= this.x + this.width && element.y >= this.y && element.y <= this.y + this.height;
  }
  // isInBounds()
  /**
   * Browse the LibraryStack by changing tkhe z-index of all the ElementWidget
   */
  browseStack() {
    this.upperIndex = (this.upperIndex + 1) % this._stackList.length;
    const zIndexBottom = this._stackList[this._stackList.length - 1].zIndex;
    for (let i = this._stackList.length - 1; i > 0; i -= 1) {
      this._stackList[i].zIndex = this._stackList[i - 1].zIndex;
      this._stackList[i]._domElem.css("z-index", this._stackList[i].zIndex);
    }
    this._stackList[0].zIndex = zIndexBottom;
    this._stackList[0]._domElem.css("z-index", this._stackList[0].zIndex);
  }
  /**
   * Get the z-index of the upper ElementWidget
   */
  getUpperIndex() {
    let maxZindex = -2e7;
    let index = 0;
    for (let i = 0; i < this._stackList.length; i += 1) {
      if (this._stackList[i].zIndex > maxZindex) {
        maxZindex = this._stackList[i].zIndex;
        index = i;
      }
    }
    return index;
  }
  /**
   * Hide the LibraryStack
   */
  hide() {
    this._domElem.hide();
    this.isDisabled = true;
  }
  /**
   * Show the LibraryStack
   */
  show() {
    this._domElem.show();
    this.isDisabled = false;
  }
  /**
   * Set tangible LibraryStack
   * @param {string} tag - Tag ID
   * @param {number} mode - Position mode
   */
  setTangible(tag, mode) {
    this.showTag = tag;
    this.tangibleMode = mode;
    this.hide();
  }
};
export {
  CircularMenu,
  ElementWidget,
  ImageElementWidget,
  LibraryBar,
  LibraryStack,
  MenuItem,
  VideoElementWidget
};
//# sourceMappingURL=@dj256_tuiomanager_widgets.js.map
