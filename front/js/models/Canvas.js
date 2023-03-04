

class Canvas {

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    setCanvasNode(canvasNode) {
        this.canvas = canvasNode
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    getCtx() {
        return this.canvas.getContext('2d')
    }

    getCanvasRect() {
        return this.canvas.getBoundingClientRect()
    }
}

const SCORETABLE_WIDTH = 400
const GRID_GAP = 15
const CONTAINER_PADDING = 15

export const CANVAS = new Canvas(
    innerWidth - SCORETABLE_WIDTH - GRID_GAP - CONTAINER_PADDING*2,
    innerHeight - CONTAINER_PADDING*2,
)