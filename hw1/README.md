# Software Studio 2023 Spring
## Assignment 01 Web Canvas
### **110060020 戴佑丞** 

### Scoring

| **Basic components**                             | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Basic control tools                              | 30%       | Y         |
| Text input                                       | 10%       | Y         |
| Cursor icon                                      | 10%       | Y         |
| Refresh button                                   | 5%       | Y         |

| **Advanced tools**                               | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Different brush shapes                           | 15%       | Y         |
| Un/Re-do button                                  | 10%       | Y         |
| Image tool                                       | 5%        | Y         |
| Download                                         | 5%        | Y         |

| **Other useful widgets**                         | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Name of widgets                                  | 1~5%     | N         |


---

### How to use 
#### 筆刷顏色、大小與字體
:::info
![](https://i.imgur.com/HX31OnT.png =30%x)

用滑鼠點擊上方調色盤可以改變筆刷的顏色、點擊最右邊的色帶可以控制中間的主色，接著點擊中間可以選取該主色的明度與飽和度，選取到的顏色會顯示在最左邊的方框中，並改變筆刷顏色。

中間的滑桿用來控制筆刷大小，可以控制在1到100的數值內，左邊也會顯示目前筆刷大小的數值。

最下面可以控制文字輸入時的字體，左邊選單可以選擇字體樣式，右邊選單可以選擇字體大小。
:::
#### 筆、橡皮擦
:::info
![](https://i.imgur.com/BRr1SXO.png) ![](https://i.imgur.com/XLFssEI.png)

可以在畫布上畫畫，顏色可以用調色盤改變，筆刷大小也可以改變。

橡皮擦可以擦除在畫布上的所有東西，擦除範圍也可以用筆頭大小來控制。
:::
#### 文字輸入
:::info
![](https://i.imgur.com/XFP5AMU.png)

用此工具在畫布上點擊後會出現輸入框，輸入文字後按下enter可以將文字印到畫布對應位置上，字體樣式與字體大小可以改變，若改變筆刷顏色，印到畫布上的字的顏色也會改變，若已經開了一個輸入框，在沒有按下enter鍵時，切換模式或是再開一個輸入框，原有的輸入框會消失。
:::

#### 圖形工具
:::info
![](https://i.imgur.com/4mdU8Ez.png) ![](https://i.imgur.com/NVooObz.png) ![](https://i.imgur.com/batRwWA.png) 

上面的模式分別可以畫出空心的圓形、矩形、三角形，圖形的邊框顏色與大小可以改變。


:::
#### undo、redo
:::info
![](https://i.imgur.com/9bYLLwM.png =5%x) ![](https://i.imgur.com/vBtiJHs.png =5%x)

undo可以將畫布返回到上一個狀態，redo可以將畫布重製回下一個狀態，若在有undo過的狀態下進行新的繪製，則redo的紀錄會被清除。
:::
#### 清除工具
:::info
![](https://i.imgur.com/5fy0bMA.png =5%x)

可以將畫布整個清空，清除工具被視為狀態的更新，因此可以用undo來返回清除前的狀態。
:::

#### 圖片上傳
:::info
![](https://i.imgur.com/WbRXGA7.png =5%x)

按下按鈕後可以上傳圖片，圖片會以適當大小靠齊左上角印在畫布上。
:::
#### 圖片下載
:::info
![](https://i.imgur.com/j5t4Tap.png =5%x)

按下按鈕後可以將目前畫布的圖下載下來。
:::

### Bonus Function description
#### 實心
:::info
![](https://i.imgur.com/nLi4P4v.png =5%x)

按下後進入實心模式，可以畫出實心的圓形、矩形、三角形，在按一次後會退出實心模式。
:::
#### 直線
:::info
![](https://i.imgur.com/frGrEOu.png)

可以在畫布上畫出直線，直線的顏色與大小也可以改變。
:::
#### 彩虹筆
:::info
![](https://i.imgur.com/gby0WDg.png)

與一般的筆相同，但是顏色會以彩虹的顏色變化，大小一樣可以用筆刷大小控制。
:::
#### 顏色吸取工具
:::info
![](https://i.imgur.com/jAmmmbf.png)

在此模式下點擊畫布，可以將筆頭的顏色變更為點擊到的顏色。
:::warning
因為icon的圖片原因，吸取的位置會稍微偏左上角一些。
:::
#### reset
:::info
![](https://i.imgur.com/XPnChxK.png =5%x)

將畫布完全清空，與清除工具不同的是，reset會清除所有undo與redo的紀錄，原本的狀態無法用undo找回。
:::








### Web page link
    
[link](https://mycanvas-705a0.firebaseapp.com/)
    
### Others (Optional)
none

<style>
table th{
    width: 100%;
}
</style>
