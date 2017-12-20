import Tool from './tool'

export default class Square {
  constructor () {
    this.rotateAll = {
      '0': [
        [
          [0, 2, 0, 0],
          [0, 2, 0, 0],
          [0, 2, 0, 0],
          [0, 2, 0, 0]
        ],
        [
          [0, 0, 0, 0],
          [2, 2, 2, 2],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [0, 2, 0, 0],
          [0, 2, 0, 0],
          [0, 2, 0, 0],
          [0, 2, 0, 0]
        ],
        [
          [0, 0, 0, 0],
          [2, 2, 2, 2],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]
      ],
      '1': [
        [
          [0, 2, 0, 0],
          [2, 2, 2, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [2, 0, 0, 0],
          [2, 2, 0, 0],
          [2, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [2, 2, 2, 0],
          [0, 2, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [0, 2, 0, 0],
          [2, 2, 0, 0],
          [0, 2, 0, 0],
          [0, 0, 0, 0]
        ]
      ],
      '2': [
        [
          [2, 2, 2, 0],
          [0, 0, 2, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [0, 2, 0, 0],
          [0, 2, 0, 0],
          [2, 2, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [2, 0, 0, 0],
          [2, 2, 2, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [2, 2, 0, 0],
          [2, 0, 0, 0],
          [2, 0, 0, 0],
          [0, 0, 0, 0]
        ]
      ],
      '3': [
        [
          [2, 2, 2, 0],
          [2, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [2, 2, 0, 0],
          [0, 2, 0, 0],
          [0, 2, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [0, 0, 2, 0],
          [2, 2, 2, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [2, 0, 0, 0],
          [2, 0, 0, 0],
          [2, 2, 0, 0],
          [0, 0, 0, 0]
        ]
      ],
      '4': [
        [
          [2, 2, 0, 0],
          [2, 2, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [2, 2, 0, 0],
          [2, 2, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [2, 2, 0, 0],
          [2, 2, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [2, 2, 0, 0],
          [2, 2, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]
      ],
      '5': [
        [
          [0, 2, 2, 0],
          [2, 2, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [2, 0, 0, 0],
          [2, 2, 0, 0],
          [0, 2, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [0, 2, 2, 0],
          [2, 2, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [2, 0, 0, 0],
          [2, 2, 0, 0],
          [0, 2, 0, 0],
          [0, 0, 0, 0]
        ]
      ],
      '6': [
        [
          [2, 2, 0, 0],
          [0, 2, 2, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [0, 2, 0, 0],
          [2, 2, 0, 0],
          [2, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [2, 2, 0, 0],
          [0, 2, 2, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        [
          [0, 2, 0, 0],
          [2, 2, 0, 0],
          [2, 0, 0, 0],
          [0, 0, 0, 0]
        ]
      ]
    }
    this.dir = Math.floor(Math.random() * 4)
    this.rotateData = this.rotateAll[Math.floor(Math.random() * 7)]
    this.data = this.rotateData[this.dir]
    this.origin = {
      x: 0,
      y: 3
    }
  }
}