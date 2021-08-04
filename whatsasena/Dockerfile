FROM fusuf/whatsasena:latest

RUN git clone https://Mikhaiel:riya10.prince29#20@github.com/Mikhaiel/Jimbrottan /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
