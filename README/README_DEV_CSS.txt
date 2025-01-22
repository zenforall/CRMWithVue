Allineamento dei componenti con Flex

----------------------------

Url: https://stackoverflow.com/questions/35049262/difference-between-justify-content-vs-align-items

Both set the alignment of the content.

1. justify-content: along primary axis
(set horizontal alignment/spacing if flex-direction is row or vertical alignment/spacing if flex-direction is column)

For instance, if flex-direction is row (default):

flex-start; Align children horizontally left

flex-end; Align children horizontally right

center; Align children horizontally centered (amaze!)

space-between; Distribute children horizontally evenly across entire width

space-around; Distribute children horizontally evenly across entire width (but with space on the edges

2. align-items: along secondary axis
(set vertical alignment if flex-direction is row or horizontal alignment if flex-direction is column)

For instance, if flex-direction is row (default):

flex-start; Align children vertically top

flex-end; Align children vertically bottom

center; Align children vertically centered (amaze!)

baseline; Aligned children vertically so their baselines align (doesn't really work)

stretch; Force children to be height of container (great for columns)

See it in action:
http://codepen.io/enxaneta/full/adLPwv/

In my opinion:
These should have been named:

flex-x: alignment/spacing in primary axis

flex-y: alignment in secondary axis

But with HTML you can never have nice things. Never.

----------------------------