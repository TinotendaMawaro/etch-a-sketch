//CREATE A GRID
//set grid to always occupy the same area

//where the grid will be created
const gridParent = document.querySelector('#grid-parent')
// save viewport height for math
const contSize = window.innerHeight - gridParent.offsetTop * 2
//set height to viewport height
gridParent.style.height = contSize + 'px'
//set same size to width to make a square
gridParent.style.width = gridParent.style.height

//set intro text to same size as grid
const introCont = document.querySelector('#intro')
introCont.style.width = contSize + '0,1px'

//have a button that fires user input and clearing
const clearBtn = document.querySelector('#new_grid')

function askSize(){
    let size = 16;
    
    //ask for user input for number of rows and columns (MAX = 100)
    do {
        size = +prompt('Enter a grid size e.g.: 16 (16x16), 64 (64x64) [MAX=100]')
    } while (size > 100)
    
    newGrid(size)
}

if (clearBtn){
    console.log(clearBtn)
clearBtn.addEventListener('click', askSize)

}



function newGrid(gridSize){
    //clear grid entirely
    gridParent.innerHTML = ''
    
    //to house our cells
    const row = document.createElement('div')
    row.classList.add('single-row')
    
    //create same cells as number of columns
    for (let i = 0; i < gridSize; i++){
        //append each cell to a row
        row.insertAdjacentHTML('beforeend', '<div class="cell"></div>')
    }
    
    const storedRow = row.outerHTML
    
    //duplicate the row the amount as the user input
    for (let j = 0; j < gridSize; j++){
        gridParent.insertAdjacentHTML('beforeend', storedRow)
    }

    //set gridParent row amount (not really)
    gridParent.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`
    //set column amount
    const allRows = document.querySelectorAll('.single-row')
    allRows.forEach(row => row.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`)
    
    //add event listener to cells
    const newCells = document.querySelectorAll('.cell')
    newCells.forEach(cell => {
        const size = contSize / gridSize;
        cell.style.width = size + 'px'
        cell.style.height = size + 'px'
        cell.addEventListener('mouseenter', colorChange)

        //random shade to begin
        const shade = Math.round(Math.random() * (100 - 90) + 90)
        //set random shade
        cell.style.backgroundColor = `hsl(0, 0%, ${shade}%)`
    })
}

function colorChange(){
    //make blacker on each hover (store # of passes inside each cel)

    //if pass is undefined set to 1
    if(!this.passes) this.passes = 1;
    //if pass is greater or equal to 9, set to 10
    else if (this.passes >= 9) this.passes = 10;
    //else set to number of passes plus 1
    else this.passes++;
    //subtract the number of passes minus 100
    const light = 100 - this.passes * 10
    
    //random hue for each pass
    const randomHue = Math.floor(Math.random() * 360)
    //set random color
    this.style.backgroundColor = `hsl(${randomHue}, 100%, ${light}%)`
}

document.addEventListener('click', () => {
    
})