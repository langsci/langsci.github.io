---
layout: post
title: Drawing vowel charts with TikZ
author: Felix Kopecky
date: 2016-06-15
--- 

Books in linguistics frequently contain drawings such as vowel charts, syntax trees, or kinship graphs. The graphics language TikZ enables authors to input the code for vector graphics directly into the LaTeX version of their books. Vector graphics are generally visually more appealing than raster graphics in formats such as *png or *jpg, and TikZ already ships with standard LaTeX distributions. Thus, no further software installation is required on the author’s side.

In this blog post, we will draw a vowel chart to exemplify TikZ. In the first step, we will assume that there is a draft of the vowel chart, either drawn on paper or in another program. At the end of this blog post, we show two predefined vowel chart commands from the langscibook class that aim to make vowel chart generation from scratch convenient to the author.

# Setting up the TikZ environment for a pre-drawn vowel chart

The TikZ package will automatically be loaded with the langscibook document class. In the same way that LaTeX can be extended using packages, the functionality of TikZ can be extended using plugins. These are loaded with \usetikzlibrary{}. Note that the TikZ libraries positioning and calc are already loaded by langscibook.

Let’s begin by creating the frame of our vowel chart. A vowel chart is a polygon with four corner points. A point in TikZ is called a node. Let’s begin by defining four nodes left upper,  right upper, left lower, right lower:
  The skeleton of a vowel chart
  
  Frame of a vowel chart
`````` 
  \begin{tikzpicture}[baseline, on grid=true]
  \node at (0,0) [] (lupoint) {};
  \node [right=6cm of lupoint] (rupoint) {};
  \node [below right=4.5cm and 1cm of lupoint] (llpoint) {};
  \node [below=4.5cm of rupoint] (rlpoint) {};
  \end{tikzpicture}
`````` 
  Note that any command within a tikzpicture has to end with a semicolon. The command \node has a mandatory argument (in curly braces), which gives the label of the node. Since our corner points should not have any label text, the argument is left empty.
  
  The first node defines the anchor point at our graph’s origin, using the coordinate method of positioning. We could give further style information between brackets, but for the origin, this is not necessary in our case. The node, however, needs an ID, which is used to reference it internally. The ID will not be visible in the final drawing. It is normally useful to choose a mnemonic name like lupoint for “left upper”.
  
  The remaining nodes only differ with respect to the positioning method. Here, we use the relative positioning method, using the distance we measured on our paper sketch. You could of course also position the other elements absolutely.
  
  Relative positioning is provided by the positioning plugin. The command right=6cm of lupoint will print the center of the node 6cm right of the center of node lupoint. As you can see in the third node, it is also possible to give two-dimensional directions. These can be given in two ways. Either a two-dimension direction like below left is followed by two values separated by an and, in which case the node is positioned in the first direction by the first value and in the the second direction by the second value. If only one value is given for a two-dimensional direction, the node moves by this value in that direction. For example, by providing below left=6cm, the respective node will move 6cm in the south-eastern direction, which is not equal to moving 6cm south and 6cm east. This difference can be imagined by comparing moving through Manhattan in a cab (two-dimensional with two values) or by traveling between the same points in a helicopter (two-dimensional with one value).
  
  Our skeleton is now complete. But since we have not provided any drawing options, the LaTeX output will be blank. Let us now create lines to connect our points and create the polygon shape. If you do not want to add the shape of the vowel graph to your document, simply ignore this command. It will have no effect on the functionality of the remaining code.
  
```  
  \draw (lupoint.center) -- (rupoint.center) -- (rlpoint.center) -- (llpoint.center) -- (lupoint.center);
```

  This command will link the nodes listed.
  
  The draw command has several options we did not use in our simple example. For example, we could have produced dashed and thicker lines using \draw[thick, dashed]. Also, we could have made the lines to carry arrow tips by using \draw (x) -> (y);. We will see more examples of the powers of \draw in a later blog post on kinship graphs.
  
  These commands produce the skeleton of a vowel chart, as seen below:
    
    The skeleton of a vowel chart
    
# Adding vowels
    
Our vowel chart still lacks its most important features. We will use the same positioning method to place our vowels that we used to create the skeleton layout. (The chart displayed here does not make any scientific claims and is merely for instructional purposes):

```
      \node[below right=\baselineskip and 0.6cm of ol] (i) {i};
      \node[below left=\baselineskip and .25cm of or](u) {u};
      \node[below left=\baselineskip and .5cm of u](U) {ʊ};
      \node[below right=\baselineskip and .75cm of i] (I) {ɪ};
      \node[below right=2\baselineskip and .5cm of i](e) {e};
      \node [right=2.25cm of e](E) {ə};
      \node[right=2.25cm of E.west](o) {o};
      \node[below right=2\baselineskip and .5cm of e](eps) {ε};
      \node[right=4cm of eps](oo) {ɔ};
      \node[above right=.5\baselineskip and 1.5cm of ul](a) {a};
      \node[above right=\baselineskip and 1.25cm of a](A) {ɐ};
```      
      Populated vowel chart
      
Note that TikZ plays well with commands from other TeX packages, such as \textlowering{ɔ}, which is a tipa command. A very useful command for relative positioning is x\baselineskip, where x is any multiplier. Since we provided the baseline option in `\begin{tikzpicture}[baseline]`, newlines will be adjusted like in the rest of your document.

# More precise placement options

The achieved result may be fully sufficient for many use cases. However, the above result shows some shortcomings of our current placing strategy: The distance of nodes was thought to be measured from an already printed original, but if this original was faulty or didn’t exist at all, the alignment, for example of ə in the above picture, would not be ideal. Let us delve into a more sophisticated placing operation, the \path let command. First, let’s determine the exact location for ə. The calculations are done using the calc plugin.
      
```
\path let
\p{ucenter} = ($ (lupoint) !.5! (rupoint) $), \p{lcenter} = ($ (llpoint) !.5! (rlpoint) $)
in
coordinate (ucenter) at (\p{ucenter}) coordinate (lcenter) at (\p{lcenter});
\path let
\p{mid} = ($ (ucenter) !.5! (lcenter) $)
in
coordinate (mid) at (\p{mid});
```
In the first line, we calculate the center between the left and right upper nodes of the skeleton (ucenter). We then calculate the center of the right and left lower points (lcenter). Finally, we calculate the center of the line that goes through both center points (mid).

The coordinate mid now points to the exact location where we want to place ə. Now assume that we also want to place our a in the exact middle, but below our already placed ə. In such circumstances it becomes necessary to import the x-coordinate from one point and the y-coordinate form an entirely different point, which is another application of the `path let` command.

```
\path let \p1=(E), \p2=(a) in node at (\x1, \y2) (vowel-a) {a};
```
Here, we took the x-coordinate from node E and the y-coordinate from point a and combined those coordinates in point vowel-a. These two methods improve the quality of our vowel chart, as seen below:
  
Vowel chart with improved alignment

Next, we will consider the case where the vowel chart need not depend on a draft.

# Vowel chart creation within the langscibook class

The document class provided by Langsci Press already has two pre-defined vowel chart commands, \aeiou and \aeiouEO. They will create a 3- and 4-tier chart, respectively:
  
4-tier vowel chart created by \aeiouEO and 3-tier vowel chart created by \aeiou 

Using the node positioning methods known from the paragraphs above, these charts can be easily adopted to fit the author’s needs. Note the scale= option which makes it possible to enlarge or reduce the figure. Other than the previous charts, the \aeiou commands produce vowel charts independent of any fixed measurement and are thus fully scalable. Lets say we want do add a schwa vowel in the exact center of the chart:

```
\begin{tikzpicture}[baseline=default, on grid=true, scale=1.25]
\aeiou
\node at (1.5,1.5) (ә) {ә};
\end{tikzpicture}
```

Since the vowel charts are defined with x- and y-length set to 3, we can point to the exact center of the chart with the coordinate (1.5,1.5) using an absolute positioning method. The complete list of coordinate definitions can be found in langsci/langsci-optional.sty, which is shipped with langscibook.
 

A schwa vowel added to the \aeiou chart

Sometimes, using the relative positioning method will better accommodate the author’s needs. Since our vowel charts should be fully scalable, we should use a relative distance value, which can be achieved by giving no unit information at all in the [right=.5 of e] argument. Here, the number 0.5 should be interpreted as corresponding to “half a step in a coordinate system which length is three steps in both directions”:

```
\begin{tikzpicture}[baseline=default, on grid=true, scale=1.25]
\aeiou
\node [right=.5 of e] (ø) {ø};
\end{tikzpicture}
```

ø added to the \aeiou chart
 
