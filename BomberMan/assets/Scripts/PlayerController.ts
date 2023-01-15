import { _decorator, Component, Input, input, EventKeyboard, KeyCode, Vec3, NodeSpace } from 'cc';
const { ccclass, property } = _decorator;

enum PlayDir {
  UP,
  DOWN,
  LEFT,
  RIGHT,
};

@ccclass('PlayerController')
export class PlayerController extends Component {
  private _currDirArray : PlayDir[] = [];
  private _speed : number = 5;

  onLoad() {
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  update(deltaTime: number) {
    this.movePlayer(deltaTime);
  }

  onDestroy() {
    input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_UP:
        this.pushDir(PlayDir.UP);
        break;
      case KeyCode.ARROW_DOWN:
        this.pushDir(PlayDir.DOWN);
        break;
      case KeyCode.ARROW_LEFT:
        this.pushDir(PlayDir.LEFT);
        break;
      case KeyCode.ARROW_RIGHT:
        this.pushDir(PlayDir.RIGHT);
        break;
    }
  }

  onKeyUp(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_UP:
        this._currDirArray.splice(this._currDirArray.findIndex((data) => { return data === PlayDir.UP }), 1);
        break;
      case KeyCode.ARROW_DOWN:
        this._currDirArray.splice(this._currDirArray.findIndex((data) => { return data === PlayDir.DOWN }), 1);
        break;
      case KeyCode.ARROW_LEFT:
        this._currDirArray.splice(this._currDirArray.findIndex((data) => { return data === PlayDir.LEFT }), 1);
        break;
      case KeyCode.ARROW_RIGHT:
        this._currDirArray.splice(this._currDirArray.findIndex((data) => { return data === PlayDir.RIGHT }), 1);
        break;
    }
  }

  pushDir(dir: PlayDir) {
    if (this._currDirArray.some((data) => { return data === dir })) {
      return;
    } else {
      this._currDirArray.push(dir);
    }
  }

  movePlayer(deltaTime: number) {
    if (this._currDirArray) {
      switch (this._currDirArray[this._currDirArray.length - 1]) {
        case PlayDir.UP:
          this.node.translate(new Vec3(this._speed * deltaTime, 0, 0), NodeSpace.WORLD);
          break;
        case PlayDir.DOWN:
          this.node.translate(new Vec3(-this._speed * deltaTime, 0, 0), NodeSpace.WORLD);
          break;
        case PlayDir.LEFT:
          this.node.translate(new Vec3(0, 0, -this._speed * deltaTime), NodeSpace.WORLD);
          break;
        case PlayDir.RIGHT:
          this.node.translate(new Vec3(0, 0, this._speed * deltaTime), NodeSpace.WORLD);
          break;
      }
    }
  }
}


