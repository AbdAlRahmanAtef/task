const editor = document.querySelector('.editor');
const shapeEditor = document.querySelector('.shape');
const dots = Array.from(document.querySelectorAll('.dot')); // Uncomment this line
const shapesContainer = document.querySelector('.shapes-container');

let activeDot = null;
let selectedShape = 5;

let thePath = '';

const clipPaths = [
  {
    name: 'Triangle',
    coords: [
      [50, 0],
      [0, 100],
      [100, 100],
    ],
  },
  {
    name: 'Trapezoid',
    coords: [
      [20, 0],
      [80, 0],
      [100, 100],
      [0, 100],
    ],
  },
  {
    name: 'Parallelogram',
    coords: [
      [25, 0],
      [100, 0],
      [75, 100],
      [0, 100],
    ],
  },
  {
    name: 'Rhombus',
    coords: [
      [50, 0],
      [100, 50],
      [50, 100],
      [0, 50],
    ],
  },
  {
    name: 'Pentagon',
    coords: [
      [50, 0],
      [100, 38],
      [82, 100],
      [18, 100],
      [0, 38],
    ],
  },
  {
    name: 'Hexagon',
    coords: [
      [50, 0],
      [100, 25],
      [100, 75],
      [50, 100],
      [0, 75],
      [0, 25],
    ],
  },
  {
    name: 'Heptagon',
    coords: [
      [50, 0],
      [90, 20],
      [100, 60],
      [75, 100],
      [25, 100],
      [0, 60],
      [10, 20],
    ],
  },
  {
    name: 'Octagon',
    coords: [
      [30, 0],
      [70, 0],
      [100, 30],
      [100, 70],
      [70, 100],
      [30, 100],
      [0, 70],
      [0, 30],
    ],
  },
  {
    name: 'Nonagon',
    coords: [
      [50, 0],
      [83, 12],
      [100, 43],
      [94, 78],
      [68, 100],
      [32, 100],
      [6, 78],
      [0, 43],
      [17, 12],
    ],
  },
  {
    name: 'Decagon',
    coords: [
      [50, 0],
      [80, 10],
      [100, 35],
      [100, 70],
      [80, 90],
      [50, 100],
      [20, 90],
      [0, 70],
      [0, 35],
      [20, 10],
    ],
  },
  {
    name: 'Bevel',
    coords: [
      [20, 0],
      [80, 0],
      [100, 20],
      [100, 80],
      [80, 100],
      [20, 100],
      [0, 80],
      [0, 20],
    ],
  },
  {
    name: 'Rabbet',
    coords: [
      [0, 15],
      [15, 15],
      [15, 0],
      [85, 0],
      [85, 15],
      [100, 15],
      [100, 85],
      [85, 85],
      [85, 100],
      [15, 100],
      [15, 85],
      [0, 85],
    ],
  },
  {
    name: 'Left arrow',
    coords: [
      [40, 0],
      [40, 20],
      [100, 20],
      [100, 80],
      [40, 80],
      [40, 100],
      [0, 50],
    ],
  },
  {
    name: 'Right arrow',
    coords: [
      [0, 20],
      [60, 20],
      [60, 0],
      [100, 50],
      [60, 100],
      [60, 80],
      [0, 80],
    ],
  },
  {
    name: 'Left Point',
    coords: [
      [25, 0],
      [100, 1],
      [100, 100],
      [25, 100],
      [0, 50],
    ],
  },
  {
    name: 'Right Point',
    coords: [
      [0, 0],
      [75, 0],
      [100, 50],
      [75, 100],
      [0, 100],
    ],
  },
  {
    name: 'Left Chevron',
    coords: [
      [100, 0],
      [75, 50],
      [100, 100],
      [25, 100],
      [0, 50],
      [25, 0],
    ],
  },
  {
    name: 'Right Chevron',
    coords: [
      [75, 0],
      [100, 50],
      [75, 100],
      [0, 100],
      [25, 50],
      [0, 0],
    ],
  },
  {
    name: 'Star',
    coords: [
      [50, 0],
      [61, 35],
      [98, 35],
      [68, 57],
      [79, 91],
      [50, 70],
      [21, 91],
      [32, 57],
      [2, 35],
      [39, 35],
    ],
  },
  {
    name: 'Message',
    coords: [
      [0, 0],
      [100, 0],
      [100, 75],
      [75, 75],
      [75, 100],
      [50, 75],
      [0, 75],
    ],
  },
];

window.onload = () => {
  handlePoints();
};

const handlePoints = () => {
  const theShape = clipPaths[selectedShape];

  const clipPath = theShape.coords
    .map(([x, y]) => `${(x / 100) * 100}% ${(y / 100) * 100}%`)
    .join(', ');

  thePath = clipPath;

  shapeEditor.style.clipPath = `polygon(${clipPath})`;

  theShape.coords.forEach(([x, y], i) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.top = `${y}%`;
    dot.style.left = `${x}%`;

    editor.appendChild(dot);

    // Add event listeners for mouse events
    dot.addEventListener('mousedown', (e) => {
      startDragging(e, i);
    });
  });
};

// handlePoints();

function startDragging(event, i) {
  activeDot = event.target;
  const { top, left } = activeDot.getBoundingClientRect();
  const dotPositionX = event.clientX - left;
  const dotPositionY = event.clientY - top;

  function dragDot(event) {
    const { top, left, width, height } = editor.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - left - dotPositionX, width));
    const y = Math.max(0, Math.min(event.clientY - top - dotPositionY, height));

    activeDot.style.left = `${x}px`;
    activeDot.style.top = `${y}px`;

    updateClipPath(i, x, y);
  }

  function stopDragging() {
    document.removeEventListener('mousemove', dragDot);
    document.removeEventListener('mouseup', stopDragging);
  }

  document.addEventListener('mousemove', dragDot);
  document.addEventListener('mouseup', stopDragging);
}

function updateClipPath(i, x, y) {
  thePath = thePath
    .split(', ')
    .map((dot, index) =>
      index === i
        ? `${(dot.split(' ')[0] = Math.ceil((x / 300) * 100))}% ${(dot.split(
            ' ',
          )[1] = Math.ceil((y / 300) * 100))}%`
        : dot,
    )
    .join(', ');

  shapeEditor.style.clipPath = `polygon(${thePath})`;
  console.log(i, x, y, thePath);
}

//render the shape

clipPaths.forEach((shape, i) => {
  const div = document.createElement('div');
  div.className = 'shape-sample';
  const clipPath = shape.coords
    .map(([x, y]) => `${(x / 100) * 100}% ${(y / 100) * 100}%`)
    .join(', ');

  div.style.clipPath = `polygon(${clipPath})`;

  div.addEventListener('click', () => {
    selectedShape = i;

    //Remove the prev dots
    document.querySelectorAll(`.dot`).forEach((element) => element.remove());
    handlePoints();
  });

  shapesContainer.append(div);
});
