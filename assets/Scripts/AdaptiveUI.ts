import { _decorator, Component, Node, view, UITransform, Size, Label, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AdaptiveUI')
export class AdaptiveUI extends Component {

    @property({ type: Size, tooltip: "Reference Resolution (Canvas Design Resolution)" })
    referenceResolution: Size = new Size(680, 640);

    @property({ tooltip: "Horizontal scale factor", range: [0, 1] })
    horizontalScaleFactor: number = 1;

    @property({ tooltip: "Vertical scale factor", range: [0, 1] })
    verticalScaleFactor: number = 1;

    @property({ tooltip: "Threshold before scale factors adjust", range: [0, 1] })
    orientationThreshold: number = 0.1;

    private _originalWidth: number = 0;
    private _originalHeight: number = 0;
    private _originalPosition: Vec3 = new Vec3();
    private _originalFontSize: number | null = null; // For Label

    onLoad() {
        const uiTransform = this.node.getComponent(UITransform);

        this._originalWidth = uiTransform.width;
        this._originalHeight = uiTransform.height;

        this._originalPosition = this.node.position.clone();

        const label = this.node.getComponent(Label);
        if (label) {
            this._originalFontSize = label.fontSize;
        }

        this.updateUI();
        view.on('canvas-resize', this.updateUI, this);
    }

    onDestroy() {
        view.off('canvas-resize', this.updateUI, this);
    }

    updateUI() {
        const uiTransform = this.node.getComponent(UITransform);

        const visibleSize = view.getVisibleSize();

        const isPortrait = visibleSize.width < visibleSize.height;

        let scale = 1;

        if (isPortrait) {
            scale = this.verticalScaleFactor;
        } else {
            scale = this.horizontalScaleFactor;
        }

        let difference = Math.abs(visibleSize.width - visibleSize.height) / Math.max(visibleSize.width, visibleSize.height);

        if (difference < this.orientationThreshold) {
            scale = (this.horizontalScaleFactor + this.verticalScaleFactor) / 2;
        }

        uiTransform.setContentSize(this._originalWidth * scale, this._originalHeight * scale);

        const label = this.node.getComponent(Label);
        if (label && this._originalFontSize !== null) {
            label.fontSize = this._originalFontSize * scale;
        }

        this.node.setPosition(this._originalPosition);
    }
}