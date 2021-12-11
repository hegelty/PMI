import sys
import os

from PyQt5.QtGui import QIntValidator, QIcon
from PyQt5.QtWidgets import (QApplication, QWidget, QGridLayout, QLabel, QLineEdit, QTextEdit, QAction, qApp,
                             QMainWindow, QFileDialog, QPushButton, QScrollArea)


class Main(QWidget):

    def __init__(self):
        super().__init__()
        self.initUI()

    def find_folder(self):
        FileFolder = QFileDialog.getExistingDirectory(self, 'Find Folder')
        self.folderPath.setText(FileFolder)
        self.makeFileList

    def initUI(self):
        grid = QGridLayout()
        self.setLayout(grid)

        self.onlyInt = QIntValidator()

        grid.addWidget(QLabel('처음 라이터 질량(g) : '), 0, 0)
        grid.addWidget(QLabel('나중 라이터 질량(g) :'), 0, 2)
        grid.addWidget(QLabel('기체 부피(L) :'), 1, 0)
        grid.addWidget(QLabel('온도(°C) : '), 1, 2)

        self.firstWeight = QLineEdit()
        self.firstWeight.setValidator(self.onlyInt)
        self.lastWeight = QLineEdit()
        self.lastWeight.setValidator(self.onlyInt)
        self.volume = QLineEdit()
        self.volume.setValidator(self.onlyInt)
        self.temperature = QLineEdit()
        self.temperature.setValidator(self.onlyInt)
        grid.addWidget(self.firstWeight, 0, 1)
        grid.addWidget(self.lastWeight, 0, 3)
        grid.addWidget(self.volume, 1, 1)
        grid.addWidget(self.temperature, 1, 3)

        self.result = QLabel('',self)
        grid.addWidget(self.result, 2, 0, 1, 2)

        startButton = QPushButton('계산', self)
        startButton.clicked.connect(self.Calculate)
        grid.addWidget(startButton, 2, 3)

        self.setWindowIcon(QIcon('logo.png'))
        self.setWindowTitle('뷰테인 분자량 구하기')
        self.resize(600, 400)
        self.show()

    def Calculate(self):
        weight = int(self.firstWeight.text()) - int(self.lastWeight.text())
        volume = int(self.volume.text())
        temperature = int(self.temperature.text())
        vaporPressure = pow(10, 8.07131-1730.63/(233.426+temperature))

        result = weight * 0.082057 * (273.15+temperature) / (((760-vaporPressure)/760)*volume);
        self.result.setText("뷰테인 질량 : "+str(round(weight,3))+"g\n수증기압 : "+str(round(vaporPressure,3))+"mmHg\n분자량 : " + str(round(result,3)))





if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex = Main()
    sys.exit(app.exec_())
