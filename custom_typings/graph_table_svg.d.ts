declare namespace GraphTableSVG {
    namespace Color {
        function createHexCodeFromColorName(colorName: string): string;
        function createHexFromColorName(colorName: string): {
            r: number;
            g: number;
            b: number;
        } | null;
        function createRGBCodeFromColorName(colorName: string): string;
        function createRGBFromColorName(str: string): {
            r: number;
            g: number;
            b: number;
        };
    }
}
declare namespace GraphTableSVG {
    namespace Common {
        function clearGraphTables(svg: SVGElement, items: (GraphTableSVG.GGraph | GraphTableSVG.GTable)[]): void;
        function IsDescendantOfBody(node: Node): boolean;
        function getRegion(items: VBAObjectType[]): Rectangle;
        function paddingLeft(text: string, length: number, leftChar: string): string;
        function setGraphTableCSS(): void;
        function getGraphTableCSS(): HTMLElement | null;
        function parseUnit(text: string): [number, string];
        function toPX(value: string): number;
        function bezierLocation([px1, py1]: [number, number], [px2, py2]: [number, number], [px3, py3]: [number, number], t: number): [number, number];
    }
}
declare namespace GraphTableSVG {
    enum VertexOrder {
        Preorder = 0,
        Postorder = 1
    }
    type CustomTag = "row" | "cell" | "t";
    type ShapeObjectType = "g-callout" | "g-arrow-callout" | "g-ellipse" | "g-rect" | "g-edge" | "g-graph" | "g-table" | "g-object" | "g-path-textbox" | "g-rect-button";
    namespace ShapeObjectType {
        const Callout: ShapeObjectType;
        const ArrowCallout: ShapeObjectType;
        const Ellipse: ShapeObjectType;
        const Rect: ShapeObjectType;
        const Edge: ShapeObjectType;
        const Graph: ShapeObjectType;
        const Table: ShapeObjectType;
        const Object: ShapeObjectType;
        const PathTextBox: ShapeObjectType;
        const RectButton: ShapeObjectType;
        function toShapeObjectType(value: string): ShapeObjectType | null;
        function toShapeObjectTypeOrCustomTag(value: string): ShapeObjectType | CustomTag | null;
    }
    type PathTextAlighnment = "none" | "begin" | "end" | "center" | "regularInterval";
    namespace PathTextAlighnment {
        const regularInterval: PathTextAlighnment;
        const begin: PathTextAlighnment;
        const end: PathTextAlighnment;
        const center: PathTextAlighnment;
        function toPathTextAlighnment(value: string): PathTextAlighnment;
    }
    type msoDashStyle = "msoLineDash" | "msoLineDashDot" | "msoLineDashDotDot" | "msoLineLongDash" | "msoLineLongDashDot" | "msoLineRoundDot" | "msoLineSolid" | "msoLineSquareDot";
    namespace msoDashStyle {
        const msoLineDash: msoDashStyle;
        const msoLineDashDot: msoDashStyle;
        const msoLineDashDotDot: msoDashStyle;
        const msoLineLongDash: msoDashStyle;
        const msoLineLongDashDot: msoDashStyle;
        const msoLineRoundDot: msoDashStyle;
        const msoLineSolid: msoDashStyle;
        const msoLineSquareDot: msoDashStyle;
        const dashArrayDic: {
            [key: string]: number[];
        };
        function toMSODashStyle(value: string): msoDashStyle;
        function setCpmoutedDashArray(svgLine: SVGLineElement | SVGPathElement | SVGElement): void;
        function getLineType(svgLine: SVGLineElement | SVGPathElement | SVGElement): msoDashStyle;
    }
    type Direction = "up" | "left" | "right" | "down";
    namespace Direction {
        function toDirection(value: string | null): Direction;
    }
    type SpeakerPosition = "upleft" | "upright" | "leftup" | "leftdown" | "rightup" | "rightdown" | "downleft" | "downright" | "inner";
    type ConnectorPosition = "top" | "topleft" | "left" | "bottomleft" | "bottom" | "bottomright" | "right" | "topright" | "auto";
    namespace ConnectorPosition {
        const Top: ConnectorPosition;
        const TopLeft: ConnectorPosition;
        const Left: ConnectorPosition;
        const BottomLeft: ConnectorPosition;
        const Bottom: ConnectorPosition;
        const BottomRight: ConnectorPosition;
        const Right: ConnectorPosition;
        const TopRight: ConnectorPosition;
        const Auto: ConnectorPosition;
        function ToConnectorPosition(str: string | null): ConnectorPosition;
        function ToVBAConnectorPosition(shapeType: string, str: ConnectorPosition): number;
        function ToVBAConnectorPosition2(shapeType: string, str: ConnectorPosition): number;
    }
    type VerticalAnchor = "top" | "middle" | "bottom";
    namespace VerticalAnchor {
        const Top: VerticalAnchor;
        const Middle: VerticalAnchor;
        const Bottom: VerticalAnchor;
        function toVerticalAnchor(value: string): VerticalAnchor;
    }
    type HorizontalAnchor = "left" | "center" | "right";
    namespace HorizontalAnchor {
        const Left: HorizontalAnchor;
        const Center: HorizontalAnchor;
        const Right: HorizontalAnchor;
        function toHorizontalAnchor(value: string): HorizontalAnchor;
    }
    function parsePXString(item: string | null): number;
}
declare namespace GraphTableSVG {
    namespace GUI {
        function showMacroModal(id: string | GObject): void;
        function createMacroModal(vbaCode: string | GObject): void;
        function removeMacroModal(): void;
        function copyAndCloseMacroModal(): void;
        function setSVGBoxSize(box: SVGSVGElement, w: number, h: number): void;
        function setSVGBoxSize(box: SVGSVGElement, rect: Rectangle, padding: Padding): void;
        function getURLParameters(): {
            [key: string]: string;
        };
        function setURLParametersToHTMLElements(): void;
        function getInputText(elementID: string): string;
        function getNonNullElementById(id: string): HTMLElement;
        function getClientRectangle(): Rectangle;
    }
}
declare namespace GraphTableSVG {
    namespace GUI {
        function observeSVGBox(svgBox: SVGSVGElement, sizeFunc: () => GraphTableSVG.Rectangle, padding?: GraphTableSVG.Padding): void;
        function autostrech(svgBox: SVGSVGElement, objects: VBAObjectType[]): void;
        function autostretchObserve(svgBox: SVGSVGElement, objects: VBAObjectType[]): void;
        function observeSVGSVG(svgBox: SVGSVGElement, padding?: GraphTableSVG.Padding): void;
        function isObserved(svgBox: SVGSVGElement): boolean;
        function observeChangeElement(): void;
    }
}
declare namespace GraphTableSVG {
}
declare namespace GraphTableSVG {
    namespace PNG {
        function copyCSStoStyle(svg: HTMLElement): void;
        function createCanvasFromImage(img: HTMLImageElement): HTMLCanvasElement;
        function setSaveEvent(img: HTMLImageElement, canvas: HTMLCanvasElement): void;
        function createPNGFromSVG(id: string): HTMLCanvasElement;
        function getImage(svgBox: HTMLElement): HTMLImageElement;
    }
}
declare namespace GraphTableSVG {
    class VLine {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        readonly smallPoint: [number, number];
        readonly largePoint: [number, number];
        constructor(x1: number, y1: number, x2: number, y2: number);
        contains(x: number, y: number): boolean;
        getY(x: number): number | null;
        readonly slope: number | null;
        readonly intercept: number | null;
        readonly inverseSlope: number | null;
        inverseIntercept(x: number, y: number): number | null;
    }
    class Padding {
        top: number;
        left: number;
        right: number;
        bottom: number;
        constructor(top?: number, left?: number, right?: number, bottom?: number);
    }
    class Size {
        width: number;
        height: number;
        constructor(width?: number, height?: number);
    }
    type Point = {
        x: number;
        y: number;
    };
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        readonly right: number;
        readonly bottom: number;
        addOffset(x: number, y: number): void;
        static merge(rects: Rectangle[]): Rectangle;
    }
}
declare namespace GraphTableSVG {
    class GObject {
        protected _svgSurface: SVGElement | null;
        protected _tag: any;
        private _svgGroup;
        protected _observer: MutationObserver;
        protected _observerOption: MutationObserverInit;
        constructor(svgbox: SVGElement | string, option?: GObjectAttributes);
        private _isInitialized;
        private __x;
        private __y;
        private __cx;
        private __cy;
        readonly defaultClassName: string | undefined;
        protected readonly isInitialized: boolean;
        protected firstFunctionAfterInitialized(): void;
        protected groupObserverOption: MutationObserverInit;
        private removeResizeEvent;
        private addResizeEvent;
        private pUpdateFunc;
        protected firstResizeUpdate(): void;
        protected resizeUpdate(): void;
        initializeOption(option: GObjectAttributes): GObjectAttributes;
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GObjectAttributes): GObjectAttributes;
        tag: any;
        readonly isShow: boolean;
        readonly svgGroup: SVGGElement;
        readonly isLocated: boolean;
        readonly svgSurface: SVGElement | null;
        cx: number;
        cy: number;
        width: number;
        height: number;
        fixedX: number | null;
        fixedY: number | null;
        readonly isCenterBased: boolean;
        x: number;
        y: number;
        isProhibitionOutOfRange: boolean;
        moveInCanvas(): void;
        readonly type: ShapeObjectType;
        protected createSurface(svgbox: SVGElement, option?: GObjectAttributes): void;
        protected setClassNameOfSVGGroup(): void;
        private observerFunc;
        protected observerFunction(x: MutationRecord[]): void;
        dispose(): void;
        readonly isDisposed: boolean;
        readonly objectID: string;
        createVBACode(id: number): string[];
        readonly VBAObjectNum: number;
        protected dispatchObjectCreatedEvent(): void;
        protected _isUpdating: boolean;
        update(): void;
        protected updateAttributes: string[];
        protected dispatchConnectPositionChangedEvent(): void;
        readonly hasSize: boolean;
        private static objectDic;
        static getObjectFromObjectID(id: string | SVGElement): GObject | null;
        static setObjectFromObjectID(obj: GObject): void;
        static getObjectFromID(id: string): GObject | null;
        getRegion(): Rectangle;
        movable(): void;
    }
}
declare namespace GraphTableSVG {
    class GTextBox extends GObject {
        private _svgText;
        private isFixTextSize;
        protected surfaceAttributes: string[];
        private _textObserver;
        private static updateTextAttributes;
        protected _isSpecialTextBox: boolean;
        protected _minimumWidth: number;
        protected _minimumHeight: number;
        constructor(svgbox: SVGElement | string, option?: GTextBoxAttributes);
        initializeOption(option: GObjectAttributes): GObjectAttributes;
        private static createSVGText;
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GTextBoxAttributes): GTextBoxAttributes;
        readonly svgText: SVGTextElement;
        protected textObserverFunc: MutationCallback;
        horizontalAnchor: HorizontalAnchor;
        verticalAnchor: VerticalAnchor;
        isAutoSizeShapeToFitText: boolean;
        update(): void;
        protected updateSurface(): void;
        protected updateToFitText(): void;
        readonly marginPaddingTop: number;
        readonly marginPaddingLeft: number;
        readonly marginPaddingRight: number;
        readonly marginPaddingBottom: number;
        paddingTop: number;
        paddingLeft: number;
        paddingRight: number;
        paddingBottom: number;
        marginTop: number;
        marginLeft: number;
        marginRight: number;
        marginBottom: number;
        readonly innerRectangle: Rectangle;
        private readonly innerRectangleWithoutMargin;
        readonly svgElements: SVGElement[];
        hasDescendant(obj: SVGElement): boolean;
        readonly hasSize: boolean;
        msoDashStyle: msoDashStyle | null;
    }
}
declare namespace GraphTableSVG {
    class GVertex extends GTextBox {
        readonly defaultClassName: string | undefined;
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        getConnectorType(type: ConnectorPosition, x: number, y: number): ConnectorPosition;
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
        readonly outcomingEdges: GEdge[];
        readonly incomingEdges: GEdge[];
        insertOutcomingEdge(edge: GEdge, insertIndex?: number): void;
        removeOutcomingEdge(edge: GEdge): void;
        insertIncomingEdge(edge: GEdge, insertIndex?: number): void;
        removeIncomingEdge(edge: GEdge): void;
        dispose(): void;
        getParents(): GVertex[];
        readonly parentEdge: GEdge | null;
        readonly parent: GVertex | null;
        readonly isNoParent: boolean;
        readonly children: GVertex[];
        readonly isLeaf: boolean;
        createVirtualTree(excludedEdgeDic?: Set<GEdge>): VirtualTree;
        readonly region: Rectangle;
        readonly shape: string;
        createVBACode(id: number): string[];
        protected readonly VBAAdjustments: number[];
        private getVBAEditLine;
        readonly graph: GGraph | null;
    }
}
declare namespace GraphTableSVG {
    class GPathTextBox extends GVertex {
        readonly svgPath: SVGPathElement;
        constructor(svgbox: SVGElement | string, option?: GTextBoxAttributes);
        protected createSurface(svgbox: SVGElement, option?: GObjectAttributes): void;
        private static createSurfacePath;
        initializeOption(option: GObjectAttributes): GObjectAttributes;
        readonly innerRectangle: Rectangle;
        readonly type: ShapeObjectType;
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
    }
}
declare namespace GraphTableSVG {
    class GArrowCallout extends GPathTextBox {
        constructor(svgbox: SVGElement | string, option?: GShapeArrowCalloutAttributes);
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GShapeArrowCalloutAttributes): GShapeArrowCalloutAttributes;
        readonly type: ShapeObjectType;
        arrowNeckWidth: number;
        arrowNeckHeight: number;
        arrowHeadWidth: number;
        arrowHeadHeight: number;
        direction: Direction;
        readonly innerRectangle: Rectangle;
        protected readonly boxHeight: number;
        protected readonly boxWidth: number;
        protected updateToFitText(): void;
        update(): void;
        readonly shape: string;
        protected readonly VBAAdjustments: number[];
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
    }
}
declare namespace GraphTableSVG {
    class GCallout extends GPathTextBox {
        constructor(svgbox: SVGElement | string, option?: GCalloutAttributes);
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GCalloutAttributes): GCalloutAttributes;
        readonly type: ShapeObjectType;
        update(): void;
        speakerX: number;
        speakerY: number;
        readonly speakerPosition: SpeakerPosition;
        readonly shape: string;
        protected readonly VBAAdjustments: number[];
    }
}
declare namespace GraphTableSVG {
    class GEdge extends GTextBox {
        constructor(svgbox: SVGElement | string, option?: GEdgeAttributes);
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GEdgeAttributes): GEdgeAttributes;
        initializeOption(option: GObjectAttributes): GObjectAttributes;
        private static connectedBeginVertexDic;
        private static connectedEndVertexDic;
        static getConnectedVertexFromDic(edge: GEdge, isBegin: boolean): GVertex | null;
        static setConnectedVertexFromDic(edge: GEdge, isBegin: boolean): void;
        readonly degree: number;
        readonly defaultClassName: string | undefined;
        readonly svgPath: SVGPathElement;
        protected _svgTextPath: SVGTextPathElement;
        readonly svgTextPath: SVGTextPathElement;
        protected createSurface(svgbox: SVGElement, option?: GObjectAttributes): void;
        private static createPath;
        readonly type: ShapeObjectType;
        tag: any;
        controlPoint: [number, number][];
        beginConnectorType: ConnectorPosition;
        endConnectorType: ConnectorPosition;
        private beginVertexID;
        private endVertexID;
        private appropriateText;
        side: string | null;
        private setAppropriateText;
        markerStart: SVGMarkerElement | null;
        markerEnd: SVGMarkerElement | null;
        private removeVertexEvent;
        private addVertexEvent;
        private connectPositionChangedFunc;
        beginVertex: GVertex | null;
        endVertex: GVertex | null;
        dispose(): void;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        readonly lineColor: string | null;
        private removeTextLengthAttribute;
        private setRegularInterval;
        private pathPoints;
        private updateConnectorInfo;
        update(): boolean;
        private static getRevString;
        pathTextAlignment: PathTextAlighnment;
        save(): void;
        setIndexDictionaryForVBA(vertexDic: {
            [key: string]: number;
        }, edgeDic: {
            [key: string]: number;
        }): void;
        VBAConnectorNumber: number;
        private static markerCounter;
        private static createMark;
        static createStartMarker(option?: {
            className?: string;
            strokeWidth?: string;
            color?: string;
        }): SVGMarkerElement;
        static createEndMarker(option?: {
            className?: string;
            strokeWidth?: string;
            color?: string;
        }): SVGMarkerElement;
        readonly shape: string;
        createVBACode(id: number): string[];
        readonly hasSize: boolean;
        createVBACodeOfText(id: number): string[][];
    }
}
declare namespace GraphTableSVG {
    class GEllipse extends GVertex {
        readonly svgEllipse: SVGEllipseElement;
        constructor(svgbox: SVGElement | string, option?: GTextBoxAttributes);
        protected createSurface(svgbox: SVGElement, option?: GObjectAttributes): void;
        private static createEllipse;
        static constructAttributes(e: SVGElement, removeAttributes?: boolean, output?: GTextBoxAttributes): GCalloutAttributes;
        readonly innerRectangle: Rectangle;
        width: number;
        height: number;
        readonly rx: number;
        readonly ry: number;
        readonly type: ShapeObjectType;
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
        readonly shape: string;
    }
}
declare namespace GraphTableSVG {
    class GGraph extends GObject {
        constructor(box: SVGElement | string, option?: GTextBoxAttributes);
        readonly vertices: GVertex[];
        readonly edges: GEdge[];
        readonly roots: GVertex[];
        protected _roots: GVertex[];
        vertexXInterval: number | null;
        vertexYInterval: number | null;
        readonly rootVertex: GVertex | null;
        add(item: GVertex | GEdge): void;
        remove(item: GVertex | GEdge): void;
        clear(): void;
        connect(beginVertex: GVertex, edge: GEdge, endVertex: GVertex, option?: ConnectOption): void;
        getOrderedVertices(order: VertexOrder, node?: GVertex | null): GVertex[];
        appendChild(parent: GVertex, child: GVertex | null, option?: {
            insertIndex?: number;
        }): void;
        relocateStyle: string | null;
        relocate(): void;
        width: number;
        height: number;
        Noderegion(): Rectangle;
        moveInCanvas(): void;
        constructFromLogicGraph(graph: LogicGraph, option?: {
            x?: number;
            y?: number;
            isLatexMode?: boolean;
        }): void;
        constructFromLogicTree(roots: LogicTree[] | LogicTree, option?: {
            x?: number;
            y?: number;
            isLatexMode?: boolean;
        }): void;
        removeGraph(svg: SVGElement): void;
        getRegion(): Rectangle;
        private createChildFromLogicTree;
        createVBACode(id: number): string[];
        readonly VBAObjectNum: number;
        getStyleValue(className: string, valueName: string): string | null;
        protected dispatchVertexCreatedEvent(vertex: GVertex): void;
        private objectCreatedFunction;
        setRootIndex(vertex: GVertex, rootIndex: number): void;
        protected observerFunction(x: MutationRecord[]): void;
        readonly type: ShapeObjectType;
        protected resizeUpdate(): void;
    }
}
declare namespace GraphTableSVG {
    class GRect extends GVertex {
        readonly svgRectangle: SVGRectElement;
        constructor(svgbox: SVGElement | string, option?: GTextBoxAttributes);
        protected createSurface(svgbox: SVGElement, option?: GObjectAttributes): void;
        private static createRectangle;
        static constructAttributes(e: SVGElement, removeAttributes?: boolean, output?: GTextBoxAttributes): GCalloutAttributes;
        readonly type: ShapeObjectType;
        readonly innerRectangle: Rectangle;
        width: number;
        height: number;
        protected updateSurface(): void;
        getLocation(type: ConnectorPosition, x: number, y: number): [number, number];
        protected getAutoPosition(x: number, y: number): ConnectorPosition;
        readonly shape: string;
    }
}
declare namespace GraphTableSVG {
    class GRectButton extends GRect {
        constructor(svgbox: SVGElement | string, option?: GTextBoxAttributes);
        initializeOption(option: GObjectAttributes): GObjectAttributes;
        readonly defaultClassName: string | undefined;
        readonly type: ShapeObjectType;
    }
}
declare namespace GraphTableSVG {
    class GTable extends GObject {
        constructor(svgbox: SVGElement, option?: GTableOption);
        private _isNoneMode;
        readonly isNoneMode: boolean;
        readonly isCenterBased: boolean;
        static constructAttributes(e: Element, removeAttributes?: boolean, output?: GTableOption): GTableOption;
        private _svgHiddenGroup;
        private _svgRowBorderGroup;
        private _svgColumnBorderGroup;
        readonly svgRowBorderGroup: SVGGElement;
        readonly svgColumnBorderGroup: SVGGElement;
        private _rows;
        private _columns;
        private _borderRows;
        private _borderColumns;
        readonly borderRows: BorderRow[];
        readonly borderColumns: BorderColumn[];
        private isConstructing;
        width: number;
        height: number;
        readonly svgHiddenGroup: SVGGElement;
        readonly type: ShapeObjectType;
        readonly rows: CellRow[];
        readonly columns: CellColumn[];
        readonly cells: Cell[][];
        private _isDrawing;
        readonly isDrawing: boolean;
        private _isAutoResized;
        isAutoResized: boolean;
        private _cellTextObserver;
        readonly cellTextObserver: MutationObserver;
        private _cellTextObserverFunc;
        readonly columnCount: number;
        readonly rowCount: number;
        readonly cellArray: Cell[];
        readonly borders: SVGLineElement[];
        fitSizeToOriginalCells(allowShrink: boolean): void;
        getTryCell(x: number, y: number): Cell | null;
        getRangeCells(x: number, y: number, width: number, height: number): Cell[][];
        getRangeCellArray(x: number, y: number, width: number, height: number): Cell[];
        getRegion(): Rectangle;
        getEmphasizedCells(): GraphTableSVG.Cell[];
        toPlainText(): string;
        private _isTextObserved;
        isTextObserved: boolean;
        private updateCellByLogicCell;
        constructFromLogicTable(table: LogicTable): void;
        construct(table: string[][], option?: {
            tableClassName?: string;
            x?: number;
            y?: number;
            rowHeight?: number;
            columnWidth?: number;
            isLatexMode?: boolean;
        }): void;
        createVBACode2(id: number, slide: string): string[];
        private createVBAMainCode;
        removeTable(svg: SVGElement): void;
        private isSetSize;
        private firstSetSize;
        private borderSizeCheck;
        setSize(columnCount: number, rowCount: number): void;
        private primitiveInsertRow;
        private primitiveInsertColumn;
        readonly borderColumnCount: number;
        readonly borderRowCount: number;
        clear(): void;
        private removeCellRow;
        private removeCellColumn;
        private primitiveRemoveRow;
        private primitiveRemoveColumn;
        private removeColumnBorder;
        private removeRowBorder;
        removeRow(ithRow: number): void;
        removeColumn(ithColumn: number): void;
        private deleteXHorizontalBorders;
        private deleteYVerticalBorders;
        private createColumnBorder;
        private createRowBorder;
        private createRow;
        private createColumn;
        private insertXHorizontalBorders;
        private insertYVerticalBorders;
        insertRow(ithRow: number): void;
        insertColumn(ithColumn: number): void;
        appendColumn(): void;
        appendRow(): void;
        private prevShow;
        update(): void;
        private updateNodeRelations;
        private resize;
        private relocation;
    }
}
declare namespace GraphTableSVG {
    namespace GraphArrangement {
        function standardTreeWidthArrangement(graph: GGraph): void;
    }
}
declare namespace GraphTableSVG {
    namespace Parse {
        function parseTree(parseText: string): GraphTableSVG.LogicTree;
        function getParseString(tree: GraphTableSVG.GVertex): string;
    }
}
declare namespace GraphTableSVG {
    namespace TreeArrangement {
        function reverse(graph: GGraph, isX: boolean, isY: boolean): void;
        function alignVerticeByChildren(graph: GGraph): void;
        function getXYIntervals(graph: GGraph): [number, number];
        function addOffset(graph: GGraph, x: number, y: number): void;
        function alignVerticeByLeaveSub(forest: GGraph, xInterval: number, yInterval: number): void;
        function alignVerticeByLeave(graph: GGraph): void;
        function standardTreeWidthArrangement(graph: GGraph): void;
    }
}
declare namespace GraphTableSVG {
    class VirtualTree {
        subTreeRoot: GVertex;
        externalEdges: Set<GEdge>;
        constructor(_root: GVertex, _externalEdgeDic?: Set<GEdge>);
        readonly root: GVertex;
        readonly children: GVertex[];
        readonly virtualTreeChildren: VirtualTree[];
        readonly parentEdge: GEdge | null;
        getSubtree(result?: GVertex[]): GVertex[];
        getHeight(): number;
        region(): Rectangle;
        readonly mostLeftLeave: GVertex;
        addOffset(_x: number, _y: number): void;
        setRectangleLocation(_x: number, _y: number): void;
        setRootLocation(_x: number, _y: number): void;
        setRegionXYLocation(_x: number, _y: number): void;
        readonly leaves: GVertex[];
    }
}
declare namespace GraphTableSVG {
    class BorderRow {
        private readonly table;
        private _svgGroup;
        readonly svgGroup: SVGGElement;
        borderY: number;
        constructor(_table: GTable, _y: number, columnSize: number, borderClass?: string);
        private _borders;
        readonly borders: SVGLineElement[];
        insertBorder(coromni: number, borderClass?: string): void;
        removeBorder(i: number): void;
        remove(): void;
    }
    class BorderColumn {
        private readonly table;
        private _svgGroup;
        borderX: number;
        readonly svgGroup: SVGGElement;
        constructor(_table: GTable, _x: number, rowSize: number, borderClass?: string);
        private _borders;
        readonly borders: SVGLineElement[];
        insertBorder(rowi: number, borderClass?: string): void;
        removeBorder(i: number): void;
        remove(): void;
    }
}
declare namespace GraphTableSVG {
    enum DirectionType {
        top = 0,
        left = 1,
        right = 2,
        bottom = 3
    }
    enum DirectionType2 {
        topLeft = 0,
        bottomLeft = 1,
        bottomRight = 2,
        topRight = 3
    }
    class Cell {
        constructor(parent: GTable, _px: number, _py: number, option?: CellOption);
        private recomputeDefaultProperties;
        private __currentClass;
        isEmphasized: boolean;
        readonly fontSize: number;
        readonly paddingLeft: number;
        readonly paddingRight: number;
        readonly paddingTop: number;
        readonly paddingBottom: number;
        horizontalAnchor: HorizontalAnchor;
        verticalAnchor: VerticalAnchor;
        static readonly emphasisCellClass: string;
        static readonly emphasisBorderClass: string;
        static readonly temporaryBorderClass: string;
        static readonly defaultCellClass: string;
        static readonly cellXName = "data-cellX";
        static readonly cellYName = "data-cellY";
        static readonly borderXName = "data-borderX";
        static readonly borderYName = "data-borderY";
        static readonly borderTypeName = "data-borderType";
        static readonly masterIDName = "data-masterID";
        static readonly masterDiffXName = "data-masterDiffX";
        static readonly masterDiffYName = "data-masterDiffY";
        private tmpStyle;
        private _table;
        readonly table: GTable;
        private _svgBackground;
        readonly svgBackground: SVGRectElement;
        private _svgText;
        readonly svgText: SVGTextElement;
        private _svgGroup;
        readonly svgGroup: SVGGElement;
        private _observer;
        private _observerFunc;
        private readonly innerExtraPaddingLeft;
        private readonly innerExtraPaddingRight;
        readonly masterDiffX: number;
        private setMasterDiffX;
        readonly masterDiffY: number;
        private setMasterDiffY;
        readonly masterCellX: number;
        private setMasterCellX;
        readonly masterCellY: number;
        private setMasterCellY;
        readonly masterID: number;
        readonly master: Cell;
        cellX: number;
        cellY: number;
        readonly isLocated: boolean;
        readonly isMaster: boolean;
        readonly isSlave: boolean;
        readonly ID: number;
        readonly isErrorCell: boolean;
        readonly GroupRowCount: number;
        readonly GroupColumnCount: number;
        readonly cellsInGroup: Cell[][];
        readonly cellArrayInGroup: Cell[];
        readonly isSingleCell: boolean;
        readonly isMasterCellOfRowCountOne: boolean;
        readonly isMasterCellOfColumnCountOne: boolean;
        x: number;
        y: number;
        width: number;
        height: number;
        readonly region: Rectangle;
        readonly computeGroupWidth: number;
        readonly computeGroupHeight: number;
        private static computeOverlapRange;
        static computeDisjunction(v: [number, number], w: [number, number]): [number, number] | null;
        readonly groupColumnRange: [number, number];
        readonly groupRowRange: [number, number];
        private computeBorderLength2;
        readonly svgTopBorder: SVGLineElement;
        readonly svgLeftBorder: SVGLineElement;
        readonly svgRightBorder: SVGLineElement;
        readonly svgBottomBorder: SVGLineElement;
        readonly logicalWidth: number;
        readonly logicalHeight: number;
        readonly calculatedWidthUsingText: number;
        private _assurancevisibility;
        readonly calculatedHeightUsingText: number;
        calculatedSizeUsingGroup(): [number, number];
        private computeSidePosition;
        getNextCell(direction: DirectionType): Cell | null;
        getNextMasterCell(direction: DirectionType): Cell | null;
        readonly topCell: Cell | null;
        readonly leftCell: Cell | null;
        readonly rightCell: Cell | null;
        readonly bottomCell: Cell | null;
        readonly bottomRightCell: Cell | null;
        readonly topRightCell: Cell | null;
        readonly bottomLeftCell: Cell | null;
        readonly topLeftCell: Cell | null;
        readonly topMasterCell: Cell | null;
        readonly leftMasterCell: Cell | null;
        readonly rightMasterCell: Cell | null;
        readonly bottomMasterCell: Cell | null;
        readonly mostRightCellX: number;
        readonly mostBottomCellY: number;
        private getNextGroupCells;
        private readonly leftSideGroupCells;
        readonly upperSideGroupCells: Cell[];
        toPlainText(): string;
        updateNodeRelations(): void;
        update(): void;
        private updateSVGGroupParent;
        private readonly topBorderRow;
        private readonly bottomBorderRow;
        private readonly leftBorderColumn;
        private readonly rightBorderColumn;
        private updateBorderParent;
        private resize;
        private locateSVGText;
        removeBorder(dir: DirectionType): void;
        removeFromTable(isColumn: boolean): void;
        private updateBorderAttributes;
        private relocateTopBorder;
        private relocateLeftBorder;
        private relocateRightBorder;
        private relocateBottomBorder;
        relocation(): void;
        mergeRight(): void;
        mergeBottom(): void;
        canMerge(w: number, h: number): boolean;
        merge(w: number, h: number): void;
        getMergedRangeRight(): [number, number] | null;
        getMergedRangeBottom(): [number, number] | null;
        readonly canMergeRight: boolean;
        readonly canMergeBottom: boolean;
        private decomposeRow;
        private decomposeColomn;
    }
}
declare namespace GraphTableSVG {
    class CellColumn {
        private readonly table;
        static readonly rowWidthName = "data-width";
        private _svgGroup;
        cellX: number;
        width: number;
        private setWidthToCells;
        readonly cells: Cell[];
        readonly length: number;
        constructor(_table: GTable, _x: number, _width?: number);
        private getMaxWidth;
        resize(): void;
        fitWidthToOriginalCell(allowShrink: boolean): void;
        setX(posX: number): void;
        readonly leftBorders: SVGLineElement[];
        readonly rightBorders: SVGLineElement[];
        readonly topBorder: SVGLineElement;
        readonly bottomBorder: SVGLineElement;
        private readonly selfx;
        _dispose(): void;
        relocation(): void;
        readonly groupColumnRange: [number, number];
    }
}
declare namespace GraphTableSVG {
    class CellRow {
        private readonly table;
        private _svgGroup;
        static readonly columnHeightName = "data-height";
        constructor(_table: GTable, _y: number, _height?: number);
        private createCell;
        _insertCell(i: number): void;
        _appendCell(num?: number): void;
        private _cells;
        readonly cells: Cell[];
        readonly length: number;
        readonly svgGroup: SVGElement;
        cellY: number;
        height: number;
        readonly topBorders: SVGLineElement[];
        readonly bottomBorders: SVGLineElement[];
        readonly leftBorder: SVGLineElement;
        readonly rightBorder: SVGLineElement;
        setHeightToCells(): void;
        resize(): void;
        fitHeightToOriginalCell(allowShrink: boolean): void;
        setY(posY: number): void;
        private getMaxHeight;
        private readonly selfy;
        _dispose(): void;
        _removeCell(i: number): void;
        readonly groupRowRange: [number, number];
    }
}
declare namespace GraphTableSVG {
    type VBAObjectType = SVGPathElement | SVGTextElement | GObject;
    class SVGToVBA {
        static create(items: VBAObjectType[] | VBAObjectType): string;
        static count(items: VBAObjectType[] | VBAObjectType): number;
        private static createVBACodeOfSVGPath;
        private static createVBACodeOfTextElement;
        static cellFunctionCode: string;
    }
    function parseInteger(value: string): number;
    function visible(value: string): number;
    class VBATranslateFunctions {
        static grouping80(codes: string[][]): string[];
        static splitCode(codes: string[][], subArg: string, callArg: string, id: number): [string, string];
        static ToFontBold(bold: string): string;
        static ToVerticalAnchor(value: string): string;
        static ToHorizontalAnchor(value: string): string;
        static createStringFunction(item: string): string;
        static createArrayFunction(items: any[]): string;
        static createStringArrayFunction(items: string[]): string;
        static createJagArrayFunction(items: any[][]): string;
        static joinLines(lines: string[]): string;
        static colorToVBA(color: string): string;
        static ToVBAFont(font: string): string;
        static TranslateSVGTextElement(sub: string[][], item: SVGTextElement, range: string): void;
        private static getFont;
        static TranslateSVGTextElement2(item: SVGTextElement, range: string): string[];
    }
}
declare namespace GraphTableSVG {
    namespace Console {
        function table(item: any): void;
        function clear(): void;
        function graph(item: any): void;
    }
}
declare namespace GraphTableSVG {
    namespace Common {
        function createCSS(): string;
    }
}
declare namespace HTMLFunctions {
    function draggable(element: SVGElement, g: SVGGElement): void;
    function appendDragFunctionsToDocument(): void;
}
declare namespace HTMLFunctions {
    enum NodeOrder {
        Preorder = 0,
        Postorder = 1
    }
    function getAncestorAttribute(e: HTMLElement | SVGElement, attr: string): string | null;
    function isShow(e: HTMLElement | SVGElement): boolean;
    function getDescendantsByPreorder(e: Element): Element[];
    function getDescendantsByPostorder(e: Element): Element[];
    function getDescendants(e: Element, order?: NodeOrder): Element[];
    function getChildren(e: Element): Element[];
    function getChildByNodeName(e: Element, name: string): Element | null;
    function isInsideElement(element: Element): boolean;
}
declare namespace HTMLFunctions {
    function createHTMLTable(e: HTMLElement): HTMLTableElement;
}
interface CSSStyleDeclaration {
    tryGetPropertyValue(name: string): string | null;
}
interface SVGTextPathElement {
    setTextContent(text: string, isLatexMode: boolean): void;
    setTextContent(text: string): void;
}
interface SVGLineElement {
    setEmphasis(b: boolean): void;
    getEmphasis(): boolean;
}
interface SVGPathElement {
    setPathLocations(points: [number, number][]): void;
    getPathLocations(): [number, number][];
}
declare namespace GraphTableSVG {
    namespace SVG {
        let idCounter: number;
        function createLine(x: number, y: number, x2: number, y2: number, className: string): SVGLineElement;
        function createText(className: string): SVGTextElement;
        function createRectangle(parent: SVGElement, className?: string | null): SVGRectElement;
        function createCellRectangle(parent: SVGElement, className?: string | null): SVGRectElement;
        function createGroup(parent: HTMLElement | SVGElement | null): SVGGElement;
        function resetStyle(style: CSSStyleDeclaration): void;
        function createCircle(parent: SVGElement, className?: string | null): SVGCircleElement;
        function createMarker(option?: {
            className?: string;
            strokeWidth?: string;
            color?: string;
        }): [SVGMarkerElement, SVGPathElement];
        function createTextPath(className?: string | null): [SVGTextElement, SVGTextPathElement];
        function createTextPath2(className: string): SVGTextPathElement;
        function setClass(svg: SVGElement, className?: string | null): void;
        function setCSSToStyle(svg: HTMLElement, isComplete?: boolean): void;
        function getAllElementStyleMap(item: HTMLElement | string): {
            [key: number]: string;
        };
        function setAllElementStyleMap(item: HTMLElement | string, dic: {
            [key: number]: string;
        }): void;
        function setCSSToAllElementStyles(item: HTMLElement | string, isComplete?: boolean): void;
        function getStyleSheet(name: string): CSSStyleDeclaration | null;
        function getRegion2(e: SVGElement): Rectangle;
        function getSVGSVG(e: SVGElement): SVGSVGElement;
        function getLeastContainer(e: SVGElement): SVGGElement | SVGSVGElement | null;
        function getAbsolutePosition(g: SVGGElement | SVGSVGElement): Point;
        function isSVGSVGHidden(e: SVGElement): boolean;
        function isSVGHidden(e: SVGElement): boolean;
    }
}
interface SVGGElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
}
interface SVGElement {
    getPaddingLeft(): number;
    getPaddingTop(): number;
    getPaddingRight(): number;
    getPaddingBottom(): number;
    setPaddingLeft(value: number): void;
    setPaddingTop(value: number): void;
    setPaddingRight(value: number): void;
    setPaddingBottom(value: number): void;
}
interface Element {
    getActiveStyle(): CSSStyleDeclaration;
    getPropertyStyleValue(name: string): string | null;
    getPropertyStyleNumberValue(name: string, defaultValue: number | null): number | null;
    getPropertyStyleValueWithDefault(name: string, defaultValue: string): string;
    setPropertyStyleValue(name: string, value: string | null): void;
    gtGetAttributeNumber(name: string, defaultValue: number | null): number | null;
    gtGetAttributeNumberWithoutNull(name: string, defaultValue: number): number;
    gtGetAttributeNumberWithUndefined(name: string): number | undefined;
    gtGetAttributeStringWithUndefined(name: string): string | undefined;
    gtGetAttributeBooleanWithUndefined(name: string): boolean | undefined;
    gtGetStyleBooleanWithUndefined(name: string): boolean | undefined;
    gtGetAttribute(name: string, defaultValue: string | null): string | null;
    gtGetAttributes(): {
        name: string;
        value: string;
    }[];
    hasStyleAttribute(name: string): boolean;
}
interface SVGTextElement {
    getX(): number;
    setX(value: number): void;
    getY(): number;
    setY(value: number): void;
    setTextContent(text: string, isLatexMode: boolean): void;
    setTextContent(text: string): void;
    getMarginLeft(): number;
    setMarginLeft(value: number): void;
    getMarginTop(): number;
    setMarginTop(value: number): void;
    getMarginRight(): number;
    setMarginRight(value: number): void;
    getMarginBottom(): number;
    setMarginBottom(value: number): void;
    gtSetXY(rect: GraphTableSVG.Rectangle, vAnchor: GraphTableSVG.VerticalAnchor | null, hAnchor: GraphTableSVG.HorizontalAnchor | null, isAutoSizeShapeToFitText: boolean): void;
}
declare namespace GraphTableSVG {
    namespace SVGTextBox {
        function setTextToSVGText(svgText: SVGTextElement, text: string, isLatexMode: boolean): void;
        function setTextToTextPath(path: SVGTextPathElement, text: string, isLatexMode: boolean): void;
        function sortText(svgText: SVGTextElement, hAnchor: GraphTableSVG.HorizontalAnchor, showChecked: boolean): void;
        function constructSVGTextByHTMLElements(svgText: SVGTextElement, text: HTMLElement[], isLatexMode: boolean): void;
        function getSize(svgText: SVGTextElement, showChecked?: boolean): Rectangle;
        function getComputedTextLengthsOfTSpans(svgText: SVGTextElement, showChecked: boolean): Size[];
    }
}
declare namespace GraphTableSVG {
    class TableDictionary {
        static IndexName: string;
        static ValueName: string;
        private columnMapper;
        private rows;
        private objects;
        constructor();
        construct(item: any): void;
        addValue(i: number, key: string, value: any): void;
        add(item: any): void;
        toLogicTable(): GraphTableSVG.LogicTable;
        createNode(item: any, graph: LogicGraph, dic: Map<object, LogicGraphNode>): LogicGraphNode;
        toLogicGraph(): LogicGraph;
    }
}
declare namespace GraphTableSVG {
    type GObjectAttributes = {
        cx?: number;
        cy?: number;
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        id?: string;
        class?: string;
        surfaceClass?: string;
        style?: string;
        surfaceStyle?: string;
    };
    type GObjectMaps = {
        groupAttributes?: Map<string, string>;
        surfaceAttributes?: Map<string, string>;
        textAttributes?: Map<string, string>;
    };
    type _GTextBoxAttribute = {
        text?: string | HTMLElement[];
        isAutoSizeShapeToFitText?: boolean;
        verticalAnchor?: VerticalAnchor;
        horizontalAnchor?: HorizontalAnchor;
        textClass?: string;
        textStyle?: string;
    };
    type GTextBoxAttributes = GObjectAttributes & _GTextBoxAttribute;
    type _GShapeArrowCalloutAttributes = {
        arrowHeadWidth?: number;
        arrowHeadHeight?: number;
        arrowNeckWidth?: number;
        arrowNeckHeight?: number;
        direction?: Direction;
    };
    type GShapeArrowCalloutAttributes = GTextBoxAttributes & _GShapeArrowCalloutAttributes;
    type GCalloutAttributes = GTextBoxAttributes & {
        speakerX?: number;
        speakerY?: number;
    };
    type _GEdgeAttributes = {
        startMarker?: boolean;
        endMarker?: boolean;
        x1?: number;
        x2?: number;
        x3?: number;
        y1?: number;
        y2?: number;
        y3?: number;
        beginConnectorType?: ConnectorPosition;
        endConnectorType?: ConnectorPosition;
        beginVertex?: GVertex | string;
        endVertex?: GVertex | string;
        pathTextAlignment?: PathTextAlighnment;
    };
    type GEdgeAttributes = GTextBoxAttributes & _GEdgeAttributes;
    type CellOption = {
        cellClass?: string;
        borderClass?: string;
    };
    type ConnectOption = {
        outcomingInsertIndex?: number;
        incomingInsertIndex?: number;
        beginConnectorType?: GraphTableSVG.ConnectorPosition;
        endConnectorType?: GraphTableSVG.ConnectorPosition;
    };
    type _GTableOption = {
        rowCount?: number;
        columnCount?: number;
        rowHeight?: number;
        columnWidth?: number;
        table?: LogicTable;
    };
    type GTableOption = GObjectAttributes & _GTableOption;
}
declare namespace GraphTableSVG {
    namespace CustomAttributeNames {
        namespace Style {
            const autoSizeShapeToFitText: string;
            const beginConnectorType: string;
            const endConnectorType: string;
            const markerStart: string;
            const markerEnd: string;
            const vertexXInterval: string;
            const vertexYInterval: string;
            const defaultRadius = "--default-radius";
            const defaultWidth = "--default-width";
            const defaultHeight = "--default-height";
            const defaultSurfaceType: string;
            const paddingTop: string;
            const paddingLeft: string;
            const paddingRight: string;
            const paddingBottom: string;
            const marginTop: string;
            const marginLeft: string;
            const marginRight: string;
            const marginBottom: string;
            const VerticalAnchor: string;
            const HorizontalAnchor: string;
            const PathTextAlignment: string;
            const msoDashStyleName = "--stroke-style";
            const relocateName = "--relocate";
            const prohibitionOutOfRange: string;
        }
        namespace StyleValue {
            const defaultTextClass: string;
            const defaultCellClass: string;
            const defaultSurfaceClass: string;
            const defaultPathSurfaceClass: string;
            const defaultEdgePathClass: string;
            const defaultTextboxPathClass: string;
            const defaultCellBackgroungClass: string;
            const defaultCellBorderClass: string;
            const defaultRectButtonSurfaceClass: string;
            const defaultRectButtonClass: string;
            const defaultEdgeClass: string;
            const defaultVertexClass: string;
            const defaultConsoleColumnTitleCellClass = "___column_title_cell";
            const defaultConsoleColumnTitleCellTextClass = "___column_title_text_cell";
            const defaultConsoleColumnTitleCellUndefinedTextClass = "___column_title_undefined_text_cell";
            const defaultConsoleColumnTitleCellBackgroundClass = "___column_title_background_cell";
        }
        const beginNodeName: string;
        const endNodeName: string;
        const appropriateEdgeText: string;
        const controlPointName: string;
        const connectPositionChangedEventName = "connect_position_changed";
        const resizeName = "resized";
        const vertexCreatedEventName = "vertex_created";
        const objectCreatedEventName = "object_created";
        const GroupAttribute = "data-type";
        const objectIDName: string;
        const customElement: string;
        let defaultCircleRadius: number;
    }
}
declare namespace GraphTableSVG {
    class LogicCell {
        text: string | null;
        cellClass: string | null;
        textClass: string | null;
        backgroundClass: string | null;
        topBorderClass: string | null;
        leftBorderClass: string | null;
        rightBorderClass: string | null;
        bottomBorderClass: string | null;
        svgText: SVGTextElement | null;
        connectedColumnCount: number;
        connectedRowCount: number;
        tTexts: HTMLElement[] | null;
        item: any;
        isLatexMode: boolean;
        constructor();
        set(text?: string | undefined, isLatexMode?: boolean, cellClass?: string | undefined, backgroundClass?: string | undefined, textClass?: string | undefined, topBorderClass?: string | undefined, leftBorderClass?: string | undefined, rightBorderClass?: string | undefined, bottomBorderClass?: string | undefined): void;
        createTextElement(svgText: SVGTextElement): void;
    }
    class LogicTable {
        cells: LogicCell[][];
        columnWidths: (number | null)[];
        rowHeights: (number | null)[];
        tableClassName: string | null;
        x: number | null;
        y: number | null;
        readonly rowCount: number;
        readonly columnCount: number;
        constructor(option?: {
            columnCount?: number;
            rowCount?: number;
            tableClassName?: string;
            x?: number;
            y?: number;
        });
        readonly cellArray: LogicCell[];
        getColumn(i: number): LogicCell[];
        getRow(i: number): LogicCell[];
        static parse(str: string, delimiter: string): string[][];
        static create(str: string[][], tableClassName?: string | null): LogicTable;
        static constructLogicTable(e: Element): LogicTable | null;
        static constructHTMLLogicTable(e: Element): LogicTable | null;
    }
}
declare namespace GraphTableSVG {
    class LogicGraphEdge {
        text: string | null;
        endNodeIndex: number;
    }
    class LogicGraphNode {
        text: string | null;
        outputEdges: LogicGraphEdge[];
        addEdge(e: LogicGraphEdge): void;
    }
    class LogicGraph {
        nodes: LogicGraphNode[];
        edges: LogicGraphEdge[];
        construct(iten: any): void;
        addNode(): LogicGraphNode;
        createEdge(): LogicGraphEdge;
        getIndex(node: LogicGraphNode): number;
    }
    class LogicTree {
        vertexText: string | null;
        parentEdgeText: string | null;
        vertexClass: string | null;
        parentEdgeClass: string | null;
        children: (LogicTree | null)[];
        item: any;
        constructor(option?: {
            item?: any;
            children?: (LogicTree | null)[];
            vertexText?: string;
            parentEdgeText?: string;
        });
        getOrderedNodes(order: VertexOrder): LogicTree[];
    }
    class BinaryLogicTree extends LogicTree {
        item: any;
        left: BinaryLogicTree | null;
        right: BinaryLogicTree | null;
        constructor(item?: any, left?: BinaryLogicTree | null, right?: BinaryLogicTree | null, nodeText?: string | null, edgeLabel?: string | null);
    }
}
declare namespace GraphTableSVG {
    namespace openSVGFunctions {
        function getTNodes(e: Element): HTMLElement[] | null;
    }
    function openCustomElement(id: string | SVGElement): GObject | null;
    function lazyOpenSVG(): void;
    function openSVG(id: string, output?: GObject[]): GObject[];
    function openSVG(element: Element, output?: GObject[]): GObject[];
    function openSVG(empty: null, output?: GObject[]): GObject[];
    function openSVG(svgsvg: SVGSVGElement, output?: GObject[]): GObject[];
    function createShape(parent: SVGElement | string | GObject, type: "g-rect-button", option?: GTextBoxAttributes): GRectButton;
    function createShape(parent: SVGElement | string | GObject, type: "g-rect", option?: GTextBoxAttributes): GRect;
    function createShape(parent: SVGElement | string | GObject, type: "g-edge", option?: GEdgeAttributes): GEdge;
    function createShape(parent: SVGElement | string | GObject, type: "g-ellipse", option?: GTextBoxAttributes): GEllipse;
    function createShape(parent: SVGElement | string | GObject, type: "g-callout", option?: GTextBoxAttributes): GCallout;
    function createShape(parent: SVGElement | string | GObject, type: "g-arrow-callout", option?: GTextBoxAttributes): GArrowCallout;
    function createShape(parent: SVGElement | string | GObject, type: "g-graph", option?: GTextBoxAttributes): GGraph;
    function createShape(parent: SVGElement | string | GObject, type: "g-table", option?: GTableOption): GTable;
    function createVertex(parent: GGraph, option?: GTextBoxAttributes): GVertex;
    function toSVGUnknownElement(e: Element): void;
    function toDivElement(e: Element): HTMLElement | null;
    function openHTML(id?: string | HTMLElement | null): void;
}
declare namespace GraphTableSVG {
    namespace GraphManager {
        function createRandomObject(size: number): {
            [key: number]: any;
        }[];
    }
}
