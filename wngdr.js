const Discord = require('discord.js');
const bot = new Discord.Client();

bot.addListener('message', greeting);
bot.addListener('message', wrathRoller);
bot.addListener('message', crit);

function greeting(messageEvent) //Standard Greeting
{
    if (messageEvent.content == 'WnGDR')
    {
        messageEvent.channel.send('Hello, ' + messageEvent.author + '. How may I help you?');
    }
}

function wrathRoller(messageEvent) //Rolling Function !roll <dice>w<wrathdice> or !roll <rawdamage>+<extradice>
{
    messageContent = messageEvent.content.split(' ');

    if (messageContent[0] == '!roll')
    {
        if (messageEvent.content.includes('w')) //!roll <dice>w<wrathdice>
        {
            withWrath = messageContent[1].split('w');
            iconCount = 0;
            exaltedIconCount = 0;
            complicationCount = 0;
            gloryCount = 0;
            rollList = new Array();
            wrathList = new Array();
            for (var i = 0; i < withWrath[0]; i++)
            {
                roll = Math.ceil(Math.random() * 6);
                rollList.push(roll);
                if (roll > 3 && roll != 6)
                {
                    iconCount++;
                }
                else if (roll == 6)
                {
                    iconCount+=2;
                    exaltedIconCount++;
                }
            }
            for (var i = 0; i < withWrath[1]; i++)
            {
                roll = Math.ceil(Math.random() *6);
                wrathList.push(roll);
                if (roll > 3 && roll != 6)
                {
                    iconCount++
                }
                else if (roll == 6)
                {
                    iconCount+=2;
                    gloryCount++;
                    exaltedIconCount++;
                }
                else if (roll == 1)
                {
                    complicationCount++;
                }
            }
            if (iconCount == 0)
            {
                messageEvent.channel.send(messageEvent.author + ': `Roll [' + messageContent[1] + ']`: You have **Failed**!!'
                + '\r[Standard] ' + rollList + ' [Wrath] ' + wrathList);
                if (complicationCount > 0)
                {
                    messageEvent.channel.send('*You experience a* __**Complication**__*!!*');
                }
            }
            else
            {
                messageEvent.channel.send(messageEvent.author + ': `Roll [' + messageContent[1] + ']`: You obtain (**' + iconCount + '**) Icons!'
                + '\r[Standard] *' + rollList + '* [Wrath] *' + wrathList + '* [Exalted Icons] ' + exaltedIconCount);
                if (complicationCount > 0)
                {
                    messageEvent.channel.send('*You experience a* __**Complication**__*!!*');
                }
                if (gloryCount > 0)
                {
                    messageEvent.channel.send('*You bring* __**Glory**__ *to your team!!*');
                }
            }
        }
        else if (messageEvent.content.includes('+')) //!roll <rawdamage>+<extradice>
        {
            withDamage = messageContent[1].split('+');
            iconCount = withDamage[0].split('+');
            rollList = new Array();
            damageList = new Array();
            for (var i = 0; i < withDamage[1]; i++)
            {
                roll = Math.ceil(Math.random() * 6);
                rollList.push(roll);
                if (roll > 3 && roll != 6)
                {
                    iconCount++;
                }
                else if (roll == 6)
                {
                    iconCount+=2;
                }
            }
            messageEvent.channel.send(messageEvent.author + ': `Roll [' + messageContent[1] + 'ED]`: You deal (**' + iconCount + '**) Damage!'
            + '\r[Extra Dice] *' + rollList + '*');
        }
        else
        {
            messageEvent.channel.send(messageEvent.author + ': `Improper Syntax!`: Please Try Again...' + 
            '\rUse "!roll <#Dice>w<#WrathDice>" for Standard Rolls.' + 
            '\rUse "!roll <#Damage>+<#ExtraDice>" for Damage Rolls.');
        }
    }
}

function crit(messageEvent) //Crit Chart
{
    if (messageEvent.content == '!crit')
    {
        roll = (Math.ceil(Math.random() * 6) * 10) + (Math.ceil(Math.random() * 6));
        if (roll >= 11 && roll <= 16)
        {
            messageEvent.channel.send(messageEvent.author + ': `Critical Hit (' + roll + ")`: \r[**Headshot**] *A well-aimed shot tears ragged chunks" + 
            " of bone and brain from the opponent's skull. The foe reels from such a violent strike, covered in gore and unable to focus.*" + 
            "\r[Effect] Target Suffers +1d3 Wounds and is Stagged.\r[Severity] +1 Wound. [Keywords] Chaos, Imperium, Scum");
        }
        else if (roll >= 21 && roll <= 23)
        {
            messageEvent.channel.send(messageEvent.author + ': `Critical Hit (' + roll + ")`: \r[**Brutal Rupture**] *Mangling flesh and crushing bone," + 
            " this attack showers the ground with blood. Ruptured organs make your foe gasp in wretched pain, weakened by the blow.*" + 
            "\r[Effect] Target Suffers +1d3 Wounds and is Hindered (1).\r[Severity] +1 Wound. [Keywords] Xenos, <Any>");
        }
        else if (roll >= 24 && roll <= 26)
        {
            messageEvent.channel.send(messageEvent.author + ': `Critical Hit (' + roll + ")`: \r[**Ferocious Rending**] *This attack shreds the opponent's" + 
            " flesh into ribbons. Gory furrows of red ruin are torn open, grinding the foe's bones and leaving them open to attack.*" +
            "\r[Effect] Target Suffers +1d3 Wounds and is Vulnerable (2)." + 
            "\r[Severity] +1 Wound. [Keywords] Psyker, Imperium, Inquisition");
        }
        else if (roll >= 31 && roll <= 33)
        {
            messageEvent.channel.send(messageEvent.author + ': `Critical Hit (' + roll + ")`: \r[**Merciless Strike**] *A blow to the foe's body steals" + 
            " the breath from their lungs, pulverizing innards with a nasty crunch.*" +
            "\r[Effect] Target Suffers one Mortal Wound.\r[Severity] +1 Mortal Wound. [Keywords] Adepta Sororitas, Adeptus Ministorum");
        }
        else if (roll >= 34 && roll <= 36)
        {
            messageEvent.channel.send(messageEvent.author + ': `Critical Hit (' + roll + ")`: \r[**Savage Attack**] *This assault leaves the opponent a" + 
            " mangled mess, slashing, burning, breaking or ripping into them with violent force.*" +
            "\r[Effect] Target Suffers one Mortal Wound. If the target survives, they immediately acquire a Memorable Injury (page 233)." + 
            "\r[Severity] +1 Mortal Wound. [Keywords] Astra Militarum, <Any>");
        }
        else if (roll >= 41 && roll <= 43)
        {
            messageEvent.channel.send(messageEvent.author + ': `Critical Hit (' + roll + ")`: \r[**Vicious Counterstrike**] *The fury of this blow causes" + 
            " horrific pain, disintegrating pieces the foe’s body in a scene of carnage and woe.*" + 
            "\r[Effect] Target suffers +1d3 Mortal Wounds.\r[Severity] +1 Mortal Wound. [Keywords] Psyker, Adeptus Mechanicus");
        }
		else if (roll >= 44 && roll <= 45)
        {
            messageEvent.channel.send(messageEvent.author + ': `Critical Hit (' + roll + ")`: \r[**Visceral Blow**] *Crimson showers the ground from" + 
            " the force of your attack. The battlefield is a gory spectacle of spilled blood and unsure footing.*" + 
            "\r[Effect] Target suffers one Mortal Wound. Each character engaged with the target must pass an Agility test (DN 3) or fall prone." + 
			"\r[Severity] +1 Mortal Wound and Target falls prone; +2 Shock. [Keywords] Psyker, Inquisition, Rogue Trader");
        }
		else if (roll == 46)
        {
            messageEvent.channel.send(messageEvent.author + ': `Critical Hit (' + roll + ")`: \r[**Murderous Onslaught**] *A thunderous blow sends the" + 
            " target sprawling. Shattered ribs pierce organs, jets of blood spew from the wound, and the foe lies writhing in pain.*" + 
            "\r[Effect] Target suffers +1d3 Wounds and is knocked prone.\r[Severity] +1 Wound. [Keywords] Chaos, Xenos, <Any>");
        }
		else if (roll >= 51 && roll <= 53)
        {
            messageEvent.channel.send(messageEvent.author + ': `Critical Hit (' + roll + ")`: \r[**Overpowering Assault**] *A stunning blow sends the foe" + 
            " lurching away, senses blurred by the brutal impact.*" + 
            "\r[Effect] Target suffers +1d6 Shock and is staggered.\r[Severity] +2 Shock. [Keywords] Chaos, Heretic, Psyker");
        }
		else if (roll >= 54 && roll <= 55)
        {
            messageEvent.channel.send(messageEvent.author + ': `Critical Hit (' + roll + ")`: \r[**Crimson Ash**] *The attack sears into the foe, " + 
            "fusing flesh into a charred ruin. The assault wreathes the target in burning fury, making a smouldering mess of sinew and bone.*" + 
            "\r[Effect] Target suffers +1d3 Wounds and is burning.\r[Severity] +1 Wound. [Keywords] Imperium, Astra Militarum, Adeptus Astartes");
        }
		else if (roll == 56)
        {
            messageEvent.channel.send(messageEvent.author + ': `Critical Hit (' + roll + ")`: \r[**Bone-shattering Impact**] *A crippling blow smashes" + 
            " the foe’s body, reducing arms, legs, and ribs to fractured splinters. Crimson stains the weapon and the ground below, along with bits of" +
            " bone torn free by the attack.*" + 
            "\r[Effect] Target suffers +1d3 Wounds and is restrained.\r[Severity] +1 Wound. [Keywords] Xenos, Adeptus Ministorum");
        }
	    else if (roll >= 61 && roll <= 63)
        {
            messageEvent.channel.send(messageEvent.author + ': `Critical Hit (' + roll + ")`: \r[**Unspeakable Carnage**] *A truly grievous strike, the" + 
            " attack is a terrifying display of martial prowess. A geyser of gore erupts from the foe’s wound and ragged remnants of their body strewn" +
            " across the battlefield.*" + 
            "\r[Effect] Target suffers 1d3+3 Mortal Wounds.\r[Severity] +1 Mortal Wound. [Keywords] Chaos, Scum, Xenos");
        }
		else if (roll >= 64 && roll <= 65)
        {
            messageEvent.channel.send(messageEvent.author + ': `Critical Hit (' + roll + ")`: \r[**Appalling Detonation**] *Ill fortune causes the blow to" + 
            " strike the foe’s volatile wargear. A chain of explosions tears their body apart into grisly red mist.*" + 
            "\r[Effect] Target suffers +1d6 Wounds. If the target carried any explosives (such as grenades or ammunition), they detonate, inflicting 1d3 Mortal Wounds." + 
			"\r[Severity] +1 bonus target within 20 metres; +1 Wound. [Keywords] Adeptus Astartes, Adeptus Mechanicus");
        }
		else if (roll == 66)
        {
            messageEvent.channel.send(messageEvent.author + ': `Critical Hit (' + roll + ")`: \r[**Grisly Amputation**] *The foe’s limb is removed with" + 
            " extreme prejudice, leaving their body in a crimson arc.*" + 
            "\r[Effect] Target suffers one Mortal Wound and one limb is destroyed. Roll 1d6: On an even result, the activating player may choose the limb" + 
			" that is destroyed in this manner. On an odd result, the GM chooses instead.\r[Severity] +1 Mortal Wound. [Keywords] Chaos, <Any>");
        }
    }
}

bot.login(process.env.BOT_TOKEN);
