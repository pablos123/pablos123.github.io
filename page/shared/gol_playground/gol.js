class GOL {
    constructor(
        gol_canvas_element,
        grid_canvas_element,
        pencil_color = "#000000",
        background_color = "#ffffff",
        max_speed = 100,
        max_cell_width_count = 100,
        max_cell_height_count = 100,
    ) {
        console.assert(gol_canvas_element, "gol canvas undefined");
        console.assert(grid_canvas_element, "grid canvas undefined");

        this.gol_canvas = gol_canvas_element;
        this.grid_canvas = grid_canvas_element;

        this.pencil_color = pencil_color;

        this.max_speed = max_speed;

        this.gol_canvas.style.backgroundColor = background_color;

        this.gol_context = this.gol_canvas.getContext("2d");
        this.grid_context = this.grid_canvas.getContext("2d");

        this.grid_active = false;

        this.speed = this.max_speed / 2;

        // The return value of window.innerWidth is the viewPort
        // So it will not work with responsive dev-tools.
        // Or other device that returns an innerWidth bigger than the actual screen...
        const max_width = Math.max(window.innerWidth, window.screen.width);
        const max_height = Math.max(window.innerHeight, window.screen.height);

        this.min_cell_size = 8;

        this.max_cell_size = Math.max(
            Math.floor(max_width / 10),
            Math.floor(max_height / 10),
        );

        this.cell_size = Math.min(
            Math.max(Math.floor(this.max_cell_size / 12), this.min_cell_size),
            this.max_cell_size,
        );

        this.cell_width_count = max_cell_width_count;
        this.cell_height_count = max_cell_height_count;

        this.grid_offset_x = 0;
        this.grid_offset_y = 0;
        this.resize();
        this.clear();
    }
    resize() {
        this.current_width = Math.min(
            window.innerWidth,
            this.cell_width_count * this.min_cell_size,
        );
        this.current_height = Math.min(
            window.innerHeight,
            this.cell_height_count * this.min_cell_size,
        );

        this.gol_canvas.width = this.current_width;
        this.gol_canvas.height = this.current_height;

        this.grid_canvas.width = this.current_width;
        this.grid_canvas.height = this.current_height;

        this.canvas_cell_height_count = Math.floor(
            this.current_height / this.cell_size,
        );
        this.canvas_cell_width_count = Math.floor(
            this.current_width / this.cell_size,
        );
    }
    clear() {
        this.paused = true;
        this.play_toggle = false;

        this.is_drawing = false;
        this.is_erasing = false;

        this.offset_x = Math.floor(
            (this.cell_width_count - this.canvas_cell_width_count) / 2,
        );
        this.offset_y = Math.floor(
            (this.cell_height_count - this.canvas_cell_height_count) / 2,
        );

        this.states = this.constructArray();

        this.gol_context.clearRect(0, 0, this.current_width, this.current_height);
    }
    constructArray() {
        const array = [];
        for (let row = 0; row < this.cell_height_count; ++row) {
            array[row] = Array(this.cell_width_count).fill(false);
        }
        return array;
    }
    play() {
        this.play_toggle = !this.play_toggle;
        if (this.play_toggle) {
            this.paused = false;
            this.play_toggle;
            return this.animate();
        }
        this.paused = true;
    }
    async animate() {
        if (this.paused) return;

        const new_states = this.constructArray();
        for (let row = 0; row < this.cell_height_count; ++row) {
            for (let column = 0; column < this.cell_width_count; ++column) {
                // New color if alive, false if not
                new_states[row][column] = this.getNextState(row, column);
            }
        }
        this.states = new_states;

        this.drawCells();
        if (this.speed) await new Promise((r) => setTimeout(r, this.speed));
        window.requestAnimationFrame(this.animate.bind(this));
    }
    getNextState(row, column) {
        const neighbours_info = this.getNeighboursInfo(row, column);
        const neighbours_count = neighbours_info.length;
        let state = false;
        if (
            this.states[row][column] &&
                (neighbours_count === 2 || neighbours_count === 3)
        )
            state = neighbours_info[Math.floor(Math.random() * neighbours_count)];
            else if (neighbours_count === 3)
                state = neighbours_info[Math.floor(Math.random() * neighbours_count)];
        return state;
    }
    getNeighboursInfo(row, column) {
        const info = [];
        for (let i = -1; i <= 1; ++i) {
            for (let j = -1; j <= 1; ++j) {
                // Skip the middle
                if (!i && !j) continue;
                let row_to_check = row;
                let column_to_check = column;
                // Periodic boundary conditions
                if (!row && i === -1) row_to_check = this.cell_height_count - 1;
                    else if (row === this.cell_height_count - 1 && i === 1)
                        row_to_check = 0;

                if (!column && j === -1) column_to_check = this.cell_width_count - 1;
                    else if (column === this.cell_width_count - 1 && j === 1)
                        column_to_check = 0;

                const color = this.states[row_to_check + i][column_to_check + j];
                if (!color) continue;
                info.push(color);
            }
        }
        return info;
    }
    drawCells() {
        this.gol_context.clearRect(0, 0, this.current_width, this.current_height);
        for (let i = 0; i <= this.canvas_cell_height_count; ++i) {
            for (let j = 0; j <= this.canvas_cell_width_count; ++j) {
                const color = this.getState(i, j);
                if (color) this.drawCell(i, j, color);
            }
        }
    }

    getState(i, j) {
        if (
            this.canvas_cell_height_count < this.cell_height_count &&
                i + this.offset_y >= this.cell_height_count
        )
            ++i;
        if (
            this.canvas_cell_width_count < this.cell_width_count &&
                j + this.offset_x >= this.cell_width_count
        )
            ++j;
        return this.states[(i + this.offset_y) % this.cell_height_count][
            (j + this.offset_x) % this.cell_width_count
        ];
    }
    setState(i, j, state) {
        if (
            this.canvas_cell_height_count < this.cell_height_count &&
                i + this.offset_y >= this.cell_height_count
        )
            ++i;
        if (
            this.canvas_cell_width_count < this.cell_width_count &&
                j + this.offset_x >= this.cell_width_count
        )
            ++j;
        this.states[(i + this.offset_y) % this.cell_height_count][
            (j + this.offset_x) % this.cell_width_count
        ] = state;
    }
    drawGrid() {
        this.grid_context.clearRect(0, 0, this.current_width, this.current_height);

        this.grid_offset_x = Math.floor((this.current_width % this.cell_size) / 2);
        this.grid_offset_y = Math.floor((this.current_height % this.cell_size) / 2);

        this.grid_context.beginPath();
        for (let i = this.grid_offset_y; i < this.current_height; i += this.cell_size) {
            this.grid_context.moveTo(0, i);
            this.grid_context.lineTo(this.current_width, i);
        }
        for (let j = this.grid_offset_x; j < this.current_width; j += this.cell_size) {
            this.grid_context.moveTo(j, 0);
            this.grid_context.lineTo(j, this.current_height);
        }
        this.grid_context.closePath();
        this.grid_context.stroke();
    }
    drawCell(i, j, color) {
        this.gol_context.fillStyle = color;
        this.gol_context.fillRect(
            j * this.cell_size + this.grid_offset_x,
            i * this.cell_size + this.grid_offset_y,
            this.cell_size,
            this.cell_size,
        );
    }
    clearCell(i, j) {
        this.gol_context.clearRect(
            j * this.cell_size + this.grid_offset_x,
            i * this.cell_size + this.grid_offset_y,
            this.cell_size,
            this.cell_size,
        );
    }
    setOffset(offset_x, offset_y) {
        if (offset_x < 0) offset_x = offset_x + this.cell_width_count;
        if (offset_y < 0) offset_y = offset_y + this.cell_height_count;
        this.offset_x = Math.floor(offset_x) % this.cell_width_count;
        this.offset_y = Math.floor(offset_y) % this.cell_height_count;
    }
    zoom(deltaY) {
        const zoom_delta = 0.8
        if (deltaY > 0) {

        }
        const rect = this.gol_canvas.getBoundingClientRect();
        this.gol_context.translate(- (this.lastX - rect.left), -(this.lastY - rect.top))

        this.gol_context.scale(1.5, 1.5)
        this.drawCells();

        if (this.grid_active) {
            this.grid_context.scale(1.5, 1.5)
            this.drawGrid();
        }
    }
    mouseDown(x, y, button) {
        const rect = this.gol_canvas.getBoundingClientRect();
        const i = Math.floor((y - this.grid_offset_y - rect.top) / this.cell_size);
        const j = Math.floor((x - this.grid_offset_x - rect.left) / this.cell_size);

        // Left
        if (button === 0) {
            this.is_drawing = true;
            this.setState(i, j, this.pencil_color);
            this.drawCell(i, j, this.pencil_color);
        } else if (button === 2) {
            // Right
            this.is_erasing = true;
            this.setState(i, j, false);
            this.clearCell(i, j);
        } else if (button === 1)
            // Wheel
            this.moveCanvas(i, j);
    }
    mouseMove(x, y) {
        this.lastX = x;
        this.lastY = y;
        if (! this.is_drawing && ! this.is_erasing) return;

        const rect = this.gol_canvas.getBoundingClientRect();
        const i = Math.floor((y - this.grid_offset_y - rect.top) / this.cell_size);
        const j = Math.floor((x - this.grid_offset_x - rect.left) / this.cell_size);

        if (this.is_drawing) {
            this.setState(i, j, this.pencil_color);
            this.drawCell(i, j, this.pencil_color);
        } else if (this.is_erasing) {
            this.setState(i, j, false);
            this.clearCell(i, j);
        }
    }
    moveCanvas(i, j) {
        // Set the offset at the selected cell and then move it to the middle
        this.setOffset(
            this.offset_x + j - this.canvas_cell_width_count / 2,
            this.offset_y + i - this.canvas_cell_height_count / 2,
        );
        this.drawCells();
    }
    mouseUp() {
        this.is_drawing = false;
        this.is_erasing = false;
    }
    resizeWindow() {
        this.resize();
        this.setOffset(this.offset_x, this.offset_y);
        this.drawCells();
        if (this.grid_active) this.drawGrid();
    }
    toggleGrid() {
        this.grid_active = !this.grid_active;
        if (!this.grid_active) {
            this.grid_context.clearRect(
                0,
                0,
                this.current_width,
                this.current_height,
            );
            return;
        }
        this.drawGrid();
    }
    setPencilColor(value) {
        this.pencil_color = value;
    }
    setBackgroundColor(value) {
        this.gol_canvas.style.backgroundColor = value;
    }
    setSpeed(value) {
        this.speed = this.max_speed - value;
    }
}

function loaded() {
    const max_speed = 100;
    const pencil_color = "#C5CEEB";
    const background_color = "#1E1E2E";

    // Get elements
    const gol_canvas_element = document.getElementById("gol-canvas");
    const grid_canvas_element = document.getElementById("grid-canvas");
    const speed_range_element = document.getElementById("speed-range");
    const play_button_element = document.getElementById("play-button");
    const clear_button_element = document.getElementById("clear-button");
    const grid_button_element = document.getElementById("grid-button");
    const pencil_button_element = document.getElementById("pencil-button");
    const background_button_element =
    document.getElementById("background-button");
    const pencil_color_element = document.getElementById("pencil-color");
    const background_color_element = document.getElementById("background-color");
    const current_pencil_color_element = document.getElementById(
        "current-pencil-color",
    );
    const current_background_color_element = document.getElementById(
        "current-background-color",
    );

    const gol = new GOL(
        gol_canvas_element,
        grid_canvas_element,
        pencil_color,
        background_color,
        max_speed,
    );

    // Prepare events
    // Disable right click
    document.addEventListener("contextmenu", (ev) => ev.preventDefault());

    window.addEventListener("resize", () => gol.resizeWindow());
    window.addEventListener("fullscreenchange", () => gol.resizeWindow());

    play_button_element.addEventListener("click", () => gol.play());
    clear_button_element.addEventListener("click", () => gol.clear());
    grid_button_element.addEventListener("click", () => gol.toggleGrid());

    speed_range_element.max = max_speed;
    speed_range_element.value = max_speed / 2;
    speed_range_element.addEventListener("input", (ev) =>
        gol.setSpeed(ev.target.value),
    );

    grid_canvas_element.addEventListener("wheel", (ev) => gol.zoom(ev.deltaY));
    grid_canvas_element.addEventListener("mousedown", (ev) =>
        gol.mouseDown(ev.clientX, ev.clientY, ev.button),
    );
    grid_canvas_element.addEventListener("mousemove", (ev) =>
        gol.mouseMove(ev.clientX, ev.clientY),
    );
    grid_canvas_element.addEventListener("mouseup", () => gol.mouseUp());

    // Control hidden inputs underneath the buttons
    current_pencil_color_element.style.background = pencil_color;
    current_background_color_element.style.background = background_color;
    pencil_button_element.addEventListener("click", () =>
        pencil_color_element.click(),
    );
    background_button_element.addEventListener("click", () =>
        background_color_element.click(),
    );
    pencil_color_element.addEventListener("input", (ev) => {
        current_pencil_color_element.style.background = ev.target.value;
    });
    pencil_color_element.addEventListener("change", (ev) => {
        gol.setPencilColor(ev.target.value);
        current_pencil_color_element.style.background = ev.target.value;
    });
    background_color_element.addEventListener("input", (ev) => {
        gol.setBackgroundColor(ev.target.value);
        current_background_color_element.style.background = ev.target.value;
    });
}

window.addEventListener("load", loaded);
