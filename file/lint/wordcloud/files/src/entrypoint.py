import os
import matplotlib.pyplot as plt

from os import path
from wordcloud import WordCloud

text = ''
for root, dirs, files in os.walk('/code'):
    for file in files:
        if file.endswith('.py') or file.endswith('.js') or file.endswith('.sh'):
            with open(os.path.join(root, file)) as f:
                text += f.read()

wordcloud = WordCloud().generate(text)

plt.imshow(wordcloud, interpolation='bilinear')
plt.axis("off")

wordcloud = WordCloud(max_font_size=40).generate(text)
plt.figure()
plt.imshow(wordcloud, interpolation="bilinear")
plt.axis("off")
plt.show()

# The pil way (if you don't have matplotlib)
# image = wordcloud.to_image()
# image.show()
