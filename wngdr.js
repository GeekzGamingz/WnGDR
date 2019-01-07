const Discord = require('discord.js');
const bot = new Discord.Client();

bot.addListener('message', wrathRoller);
bot.addListener('message', crit);
bot.addListener('message', perils);
bot.addListener('message', campaign);
bot.addListener('message', complication);
bot.addListener('message', vehicle);
bot.addListener('message', voidship);
bot.addListener('message', injury);
bot.addListener('message', maiming);
bot.addListener('message', trinket);

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
            perilsCount = 0;
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
                    perilsCount++;
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
                + '\r[**Standard**] *' + rollList + '* [**Wrath**] *' + wrathList + '* [**Exalted Icons**] ' + exaltedIconCount + ' [**Perils**] ' + perilsCount);
                if (complicationCount > 0)
                {
                    messageEvent.channel.send('*You experience a* __**Complication**__*!!*');
                }
                if (gloryCount > 0)
                {
                    messageEvent.channel.send('*You bring* __**Glory**__ *to your team!!*');
                }
                if (perilsCount > 0)
                {
                    messageEvent.channel.send('*If this was a Psychic Test, you suffer __**Perils of the Warp**__!!*')
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

function perils(messageEvent) //Rolling Function !perils <perils>
{
    messageContent = messageEvent.content.split(' ');

    if (messageContent[0] == '!perils' && messageEvent.content.includes(' '))
    {
        withPerils = messageContent[1] * 10;
        roll = (Math.ceil(Math.random() * 6) * 10) + (Math.ceil(Math.random() * 6) - 10);
        total = parseInt(roll) + parseInt(withPerils);
        if (total >= 11 && total <= 12 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Flickering Lights**] *For a brief moment," +
			" all light sources within 25 metres of the psyker flicker and go out (if outside during the day or in a similar environment, this" +
			" light source too seems to flicker for a moment).*");
        }
        else if (total >= 13 && total <= 14 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Touch of Hoarfrost**] *The temperature" +
			" instantly drops 20 degrees, and all surfaces within 25 metres of the psyker become coated with a thin rime of frost. The " +
			" temperature gradually returns to normal over the course of the next ten minutes, but for the next minute, any action attempted " +
			" that interacts with the slippery surfaces has its DN increased by 2.*");
        }
        else if (total >= 15 && total <= 16 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Roiling Mist**] *A clammy mist roils" +
			" up from the ground, surrounding the psyker for a radius of 25 metres. The mist obscures vision and distorts sounds with weird" +
			" echoes. All targets inside the mist add 2 to their Defense against ranged attacks, and any Cunning or Deception tests utilizing" +
			" sound made inside the mist add +2d to the roll. The mist persists for 1 round.*");
        }
        else if (total >= 21 && total <= 22 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Whispers in the Dark**] *All light" +
			" sources within 25 metres of the psyker grow dim and shadows pool thickly. Sinister whispers can be heard stirring in the dark," +
			" and all sentient creatures within range must make a successful Corruption test (DN 3). Any who fail the Corruption test are" +
			" vulnerable [2] for 1 round.*");
        }
        else if (total >= 23 && total <= 24 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Ghostly Apparitions**] *For a brief" +
			" time (roughly a minute), ethereal images of strange creatures move in and out of existence within 25 metres of the psyker." +
			" These apparitions move awkwardly, passing through objects and the living alike without seeming to be aware of the real world." +
			" All animals immediately flee the area, and any sentient being that witnesses the apparitions must make a Fear test (DN 3).*");
        }
        else if (total >= 25 && total <= 26 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Tears of the Martyrs**] *All" +
			" paintings, statues, or equivalent effigies within 25 metres of the psyker begin to weep blood. If no such features exist" +
			" in range, then walls or similar surfaces begin to drip with blood. This bleeding persists for 1 minute. All sentient creatures" +
			" that witness this event must make a Fear test (DN 3). Any who fail the Fear test increase the DN of any Interaction skill test" +
			" by 2 for the next round.*");
        }
        else if (total >= 31 && total <= 32 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Mocking Laughter**] *A sinister" +
			" chorus or low laughter swirls around the psyker and those around them. All sentient creatures within 25 metres must make a" +
			" successful Willpower test (DN 3) or are shaken by the experience and are hindered (1) for one round. The GM gains 1 Ruin.*");
        }
        else if (total >= 33 && total <= 34 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**The Watching**] *An overwhelming" +
			" paranoia of something watching creeps over everyone within 20 metres of the psyker, including the psyker themselves. Lesser" +
			" creatures and animals cower in fear, while sentient creatures must make a successful Willpower test (DN 4) or suffer from" +
			" an uncontrollable compunction to second-guess all their own actions — they are hindered (2). This effect lasts for the" +
			" remainder of the scene.*");
        }
        else if (total >= 35 && total <= 36 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Miasma of Decay**] *The stench" +
			" of rotting meat and decaying flesh seems to rise from the ground within 25 metres of the psyker. All creatures within range" +
			" must make a Toughness test (DN 3), including those protected by technological breathing apparatus. Those who fail suffer" +
			" 1 Shock.*");
        }
        else if (total >= 41 && total <= 42 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Sonic Concussion**] *A mighty roar" +
			" akin to a sonic boom crashes from the psyker. Lesser animal lifeforms (insects, rodents, avian, etc.) within 25 metres are" +
			" instantly killed and all others suffer 1d3 Shock and must make a successful Toughness test (DN 3) or are staggered.*");
        }
        else if (total >= 43 && total <= 44 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Bloodlust**] *All creatures within" +
			" 15 metres of the psyker begin to suffer from a ringing in their ears and taste the bitterness of iron on their tongues. For" +
			" the next round, all melee attacks made by such creatures add +1 ED to their damage.*");
        }
        else if (total >= 45 && total <= 46 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Tremor**] *The ground within 50" +
			" metres of the psyker is jolted by a sudden but brief earthquake. The tremor causes no real damage, but all creatures in" +
			" range must make a successful Agility test (DN 3) or be thrown prone and suffer 1 Shock.*");
        }
        else if (total >= 51 && total <= 52 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Life Drain**] *A numbing cold" +
			" washes out from the psyker, leeching the very life essence of those nearby. Every living creature within 25 metres immediately" +
			" suffers 1d3 Shock and all lesser lifeforms (plants, avian, insects, etc.) wither and die.*");
        }
        else if (total >= 53 && total <= 54 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Visions of the Possibilities**] *An" +
			" awful droning buzz surrounds the psyker, drowning out all speech save shouting. The drone seems to penetrate the mind. All" +
			" creatures with the psyker keyword within 10 metres must make an Intellect test (DN 4). Those who fail are staggered and" +
			" suffer 1d3 Shock. Those who succeed gain 1 Wrath.*");
        }
        else if (total >= 55 && total <= 56 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Psychic Backlash**] *Lurid pink" +
			" warp lightning dances across the psyker’s flesh. They suffer 1d3+2 Shock.*");
        }
        else if (total >= 61 && total <= 62 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**The Veil Grows Thin**] *The air" +
			" within 25 metres of the psyker grows thin, causing living creatures to suffer shortness of breath and dizziness. All creatures" +
			" without artificial breathing apparatus are hindered (2) for 1 minute. In addition, 1 bonus Wrath Dice must be added to all" +
			" Psychic Mastery tests for the remainder of the scene.*");
        }
        else if (total >= 63 && total <= 64 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**The Witching Hour**] *The mystical" +
			" energies of the warp wash over the psyker and infuse the landscape for 25 metres in every direction. All creatures in the" +
			" area suffer 1d3 Shock. In addition, the invisible energies fl owing through this area greatly increase the potency of" +
			" psychic phenomena — 1 Wrath Dice must be added to all Psychic tests. These effects last for the remainder of the Scene.*");
        }
        else if (total >= 65 && total <= 66 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Surging Warp Energies**] *The air" +
			" seems to shimmer and distort. All creatures within 25 metres of the psyker suffer 1d6 Shock and the GM gains 1 Ruin. For the" +
			" remainder if the scene, all Wrath Dice rolled as part of a Psychic Mastery test that do result in a 1 or a 6 must be re-rolled.*");
        }
        else if (total >= 71 && total <= 72 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Unnatural Urges**] *The psyker is" +
			" overcome with terrible and unwholesome desires — craving the flesh of insects or vermin, thirsting for blood, cutting living" +
			" flesh, etc. The psyker suffers 1d3+1 Shock and must make a successful Conviction test (DN 5), or they immediately give in" +
			" to the desire and gain 1 point of Corruption (along with whatever immediate consequences the urge may produce — the Player" +
			" and GM should work together to shape the event).*");
        }
        else if (total >= 73 && total <= 74 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**The Crawling**] *The psyker is" +
			" overcome with the sensation of tiny creatures moving just under their skin. They immediately suffer 1d6+1 Shock and must" +
			" increase the DN of all actions they attempt by 2 for the remainder of the scene.*");
        }
        else if (total >= 75 && total <= 76 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Twisted Flesh**] *The energies of" +
			" the warp unleash a corruptive force on the physical form of the psyker and all creatures within 10 metres. All affected" +
			" characters must make a Corruption test (DN 7). Those who fail gain 1d3 Corruption and suffer 1 Mortal Wound.*");
        }
        else if (total >= 81 && total <= 82 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Flash-Freeze**] *The environment" +
			" around the psyker grows numbingly cold, a supernatural chill suffusing every surface with glistening ice. The psyker and" +
			" every creature within 50 metres suffers a -1 to Agility and Strength for the rest of the scene. In addition, all affected" +
			" creatures must make a successful Toughness test (DN 5) or suffer 1 Mortal Wound.*");
        }
        else if (total >= 83 && total <= 84 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**The Summoning**] *A portal is torn" +
			" open between the Materium and the warp. A Daemon appears within 25 metres of the psyker. The exact location and nature of" +
			" this daemon is at the GM’s discretion (see Daemons on pages 421-428). The daemonic entity immediately attacks the nearest" +
			" target. The daemon returns to the warp after 3 rounds or when it has been destroyed, whichever comes first. The GM may spend" +
			" a point of Ruin to place the daemon closest to the psyker.*");
        }
        else if (total >= 85 && total <= 86 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Voices from Beyond**] *All creatures" +
			" within 25 metres of the psyker hear harsh, guttural voices close to their ear, though their words are seemingly gibberish." +
			" All characters within 10 metres must make a Fear test (DN 5). All sentient characters in range are staggered until the end" +
			" of the scene.*");
        }
        else if (total >= 91 && total <= 92 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Daemonic Possession**] *The" +
			" psyker’s mind is forcibly invaded and possessed by a daemonic entity. The psyker loses control of their body—they immediately" +
			" fall under the control of the GM. Typically this means that they immediately attack or otherwise act against fellow heroes," +
			" but ultimately this is up to the GM. The GM may wish to allow the player normal control under most circumstances, or may" +
			" otherwise prefer to lay the groundwork for a longer story arc regarding this possession. Regardless, the first time the" +
			" possessed character takes any damage or is foiled in some fashion (GM’s prerogative) and is not destroyed, the psyker can" +
			" make a Willpower test (DN 5). If they succeed, they mentally force the daemon out—they regain control of their body, retain" +
			" any damage done to the body to this point, and suffer 1d3 points of Corruption. If they fail the test, the daemonic entity" +
			" retains and strengthens its hold on the psyker’s body—the GM gains 1 Ruin.*");
        }
        else if (total >= 93 && total <= 94 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Writhing Disfigurement**]" +
			" *The psyker is wracked with pain, collapsing to the ground. They suffer 1d6 Shock and gains 1d3+1 Corruption points. In" +
			" addition, the psyker permanently gains a minor disfigurement or mutation chosen by the GM. Examples include one eye changes" +
			" colour, a small branding mark appears on the body, etc.*");
        }
        else if (total >= 95 && total <= 96 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Cackling Whirlwinds**] *Swirling" +
			" vortexes of misty, inhuman faces sweep past the psyker and spin away in all directions. The distorted images cackle in" +
			" maniacal glee, and all mortals who hear them struggle to keep order to their thoughts. All living creatures within 25 metres" +
			" of the psyker must make a successful Fear test (DN 7).*");
        }
        else if (total >= 101 && total <= 102 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Eye of the Gods**] *The psyker’s" +
			" mind draws the gaze of one of the Ruinous Powers themselves, if ever so fleetingly. All sentient creatures within 20 metres" +
			" of the psyker (including the psyker) must make a Corruption test (DN 7). Those who succeed gain 1 Wrath instead.*");
        }
        else if (total >= 103 && total <= 104 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Blood Rain**] *A hot and sticky blood" +
			" rain begins to fall within an 8-metre radius centered on the psyker. The supernatural storm starts slowly, but quickly builds" +
			" to a torrent lasting only minutes. Any creature whose flesh is touched by this blood must make a successful Willpower test" +
			" (DN 7) or become frenzied (see page 230). Affected creatures lapse into a temporary homicidal madness—they immediately attempt" +
			" to kill the closest being, using melee attacks if possible. This madness lasts for 3 rounds.*");
        }
        else if (total >= 105 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Perils of the Warp (' + total + ")`: \r[**Psychic Overload**] *Streaming warp" +
			" energy bursts from the psyker’s eyes and mouth, flashing in all directions and penetrating all living creatures surrounding" +
			" them. The psyker suffers 2d6 Mortal Wounds and gains 1d3 points of Corruption. All other creatures within 10 metres suffer" +
			" 1d3 Mortal Wounds and must make a successful Toughness test (DN 7) or are blinded for 1 round.*");
        }
    }
}

function campaign(messageEvent) //Campaign Card Roller !campaign
{
    if (messageEvent.content == '!campaign')
    {
        roll = (Math.ceil(Math.random() * 55));
        if (roll == 1 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**The Lost and the Damned**] ' + 
			"\r*Those who embrace the shadow are slaves to the darkness, thralls of despair.*" + 
			"\rTake one to three Wrath from another player character. Make a Corruption test at a penalty equal to the number of Wrath" +
			" taken.");
        }
        else if (roll >= 2 && roll <= 3 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Courage and Honor**] ' +
			"\r*Warriors of Ultramar. This is where we make our stand. If death be our fate, then we shall meet it with the Emperor’s word" +
			" on our lips and his light in our eyes. If we must die, we will die, but we shall never yield.*" +
			"\rAny protagonist who wishes may immediately refresh their Wrath.");
        }		
        else if (roll == 4 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**I am Alpharius**] ' +
			"\r*We are all Alpharius. We are the Alpha Legion, and we are one.*" +
			"\rPlay to reveal that someone in the scene is not who they appear to be." +
			"\rAdd 1 Glory.");
        }		
        else if (roll >= 5 && roll <= 6 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**More Dakka**] ' +
			"\r*Now give ‘em more dakka from yer gunz!*" +
			"\rPlay while making any attack that uses reloads. You regain any reloads spent during the attack and may add +1d to the attack" +
			" test.");
        }		
        else if (roll == 7 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Speed Kills**] ' +
			"\r*The red onez go fasta!*" +
			"\rPlay to double the Speed of a vehicle for one round. Alternatively, play after sprinting in combat. You may immediately make" +
			" a single melee attack against a single target as a free action. You gain +2d for this attack roll.");
        }		
        else if (roll >= 8 && roll <= 9 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Unleash the Swordwind**] ' +
			"\r*There is no art more beautiful and diverse as the art of death.*" +
			"\rEnemy reinforcements arrive, including at least one Elite or Adversary threat. After defeating these foes, the protagonists" +
			" each gain 1 to 3 Wrath depending on the strength of the forces who appeared.");
        }		
        else if (roll >= 10 && roll <= 11 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**The Tears of Isha**] ' +
			"\r*The sorrow of the Aeldari is a tragedy without equal. It lingers on the knife-edge of utter despair and fearsome rage.*" +
			"\rAll protagonists may ignore up to <Tier>+3 DN penalties until the end of this round for any and all actions.");
        }		
        else if (roll >= 12 && roll <= 13 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Faith is my Shield**] ' +
			"\r*We must be unsleeping in vigilance, swift in judgement, merciless in deed.*" +
			"\rMake a brief but inspiring statement. All protagonists gain +2d to Corruption tests for the rest of the scene." +
			"\rAdd 1 Glory.");
        }		
        else if (roll == 14 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**There is Only War**] ' +
			"\r*There is no peace among the stars, only an eternity of carnage and slaughter.*" +
			"\rPlay to have diplomacy break down while suspicion and aggression are on the rise. All Interaction skills other than" +
			" Intimidation suffer a +2DN penalty for the rest of the scene." +
			"\rAll protagonists gain 1 Wrath.");
        }		
        else if (roll == 15 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Martyrdom**] ' +
			"\r*All hail the martyrs! On their blood is our Imperium founded, in their remembrance do we honour ourselves.*" +
			"\rPlay this card to achieve a significant goal. Your character perishes in the process. All protagonists gain 1 Wrath." +
			"\rAlternatively, discard to gain 1 Wrath and draw a new card.");
        }		
        else if (roll >= 16 && roll <= 17 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Forbidden Lore**] ' +
			"\r*Ask not the Eldar a question, for they will give you three answers, all of which are true and terrifying to know.*" +
			"\rPlay to gain all of the information available on some foe, mystery, or secret. Make a Corruption test." +
			"\rGain 1 Glory.");
        }		
        else if (roll >= 18 && roll <= 19 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Death Blow**] ' +
			"\r*Blood for the blood god! Skulls for the skull throne!*" +
			"\rPlay after a successful critical hit. Double the number of bonus wounds for that critical result. Make a Corruption test." +
			"\rYou gain 1 Wrath.");
        }		
        else if (roll >= 20 && roll <= 21 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Praise the Machine-Spirit**] ' +
			"\r*The Machine God watches over you. Unleash the weapons of war.*" +
			"\rChoose one weapon that is out of ammunition or jammed. That weapon may be reloaded or unjammed as a free action once during" +
			" the current scene." +
			"\rThe weapon’s wielder gains 1 Wrath.");
        }		
        else if (roll >= 22 && roll <= 23 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Battle-Brothers**] ' +
			"\r*Brothers! War calls you. Will you answer?*" +
			"\rMake a brief statement about teamwork, unity, or brotherhood. Play to add 2 Icons to another player’s test." +
			"\rAdd 1 Glory.");
        }		
        else if (roll >= 24 && roll <= 25 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Perils of the Warp**] ' +
			"\r*Fear not the Psyker. Fear instead what the Psyker can do.*" +
			"\rPlay to cause any psyker in the scene to immediately draw and resolve a card from the Perils of the Warp deck (or roll on" +
			" the chart). All protagonists gain one Wrath. " +
			"\rAlternatively, discard to gain one Wrath and draw a new card.");
        }		
        else if (roll >= 26 && roll <= 27 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Nemesis**] ' +
			"\r*If you want a textbook example of righteous hatred, you need look no further than Commissar Yarrick. In him, we see a man" +
			" who justly despises his foes, and they in turn loath him.*" +
			"\rChoose an enemy in the current combat to become your personal foe. If they are unnamed, they gain one and become an" +
			" Adversary. You gain 2 Wrath, and they gain 2 Personal Ruin.");
        }		
        else if (roll == 28 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Enemies Without**] ' +
			"\r*We is gonna stomp the universe flat and kill anyfink that fights back. We’re da Orks and we was made ta fight and win.*" +
			"\rA group of enemies appears from concealment and attacks the protagonists." +
			"\rAll protagonists gain 1 Wrath.");
        }		
        else if (roll >= 29 && roll <= 30 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**A Flame of the Heart**] ' +
			"\r*Can love bloom on the battlefield?*" +
			"\rPlay to encourage an amorous relationship between your character and a nonplayer character. Add 3 Wrath. You may spend Wrath" +
			" for this NPC." +
			"\rAlternatively, discard to gain 1 Wrath and draw a new card.");
        }		
        else if (roll == 31 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Fickle Fates**] ' +
			"\r*Success is commemorated, failure merely remembered.*" +
			"\rPlay after a successful test by an opponent. That test fails." +
			"\rAdd 1 Glory.");
        }		
        else if (roll >= 32 && roll <= 33 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Heresy!**] ' +
			"\r*A single thought of heresy can blight a lifetime of faithful duty.*" +
			"\rDiscuss an item, being, or concept that is an example of the temptations of the Ruinous Powers. All protagonists may choose" +
			" to make a Corruption test. Those who chose to risk the Corruption test gain 1 Wrath.");
        }		
        else if (roll >= 34 && roll <= 35 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Faith, Honor, Vigilance**] ' +
			"\r*In the hour of darkness, a blind man is the best guide.*" +
			"\rPlay to steel your soul with absolute confidence in the power of whichever being you consider revered or divine. Speak a short," +
			" inspiring statement to your allies. You recover 1d3+2 Shock. All other protagonists in the scene recover 1d3 Shock.");
        }		
        else if (roll >= 36 && roll <= 37 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**My Armour is Contempt**] ' +
			"\r*In the blazing furnace of battle, we shall forge anew the iron will of a stronger race.*" +
			"\rPlay after suffering an attack from an enemy. Miraculously, the blow strikes an item in your pocket, just barely grazes your" +
			" flesh, or otherwise looks far worse than it actually is. You suffer no damage from this attack.");
        }		
        else if (roll == 38 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Perfidious Eldar**] ' +
			"\r*These aliens had the stars in their grasp and are now left to sift the dust of their once-fabulous realm.*" +
			"\rPlay to add -2d to any one skill for the rest of the scene. Add 1 Ruin to the GM’s total.");
        }		
        else if (roll == 39 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**An Airing of Greivances**] ' +
			"\r*A weapon cannot substitute for zeal.*" +
			"\rPlay during a discussion, debate, or negotiation. Make an impassioned speech to convince one individual on the opposing side" +
			" of the rightness of your position." +
			"\rYou gain 1 Wrath.");
        }		
        else if (roll >= 40 && roll <= 41 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Success is Measured in Blood**] ' +
			"\r*Through the destruction of our enemies do we earn our salvation.*" +
			"\rPlay when you have suffered one or more Wounds. All of the damage is instantly negated, but you may not Soak further Wounds" +
			" for the rest of the scene.");
        }		
        else if (roll >= 42 && roll <= 43 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**And They Shall Know No Fear**] ' +
			"\r*Through blood and fire I march. In war eternal my hearts thunder. I am an angel born of violence, a soldier formed in" +
			" legend. I am the blade in the Emperor’s hand, the holy ceramite of his armour.*" +
			"\rMake a brief but inspiring statement. All protagonists gain +2d to Resolve tests until the end of the scene." +
			"\rAdd 1 Glory.");
        }		
        else if (roll == 44 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**The Astronomican’s Light**] ' +
			"\r*Our thoughts light the darkness that others may cross space. We are the one with the Emperor, our souls joined in his" +
			" will. Praise the Emperor, whose sacrifice is life as ours is death. Hail His name, the Master of Humanity.*" +
			"\rPlay to recall (or the GM may reveal) a memory, fact, or other item of information pertinent to the current scene. " +
			"\rAdd 1 Glory.");
        }		
        else if (roll >= 45 && roll <= 46 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**The Emperor Protects**] ' +
			"\r*We stand against the rising tide of Chaos. None shall move us, or lay us low. Our foes shall batter themselves bloody" +
			" against the fortress of our contempt, and grind their bones to powder upon the ramparts of our disdain. And when they" +
			" are naught but dust upon the wind, we will remain.*" +
			"\rMake a brief but inspiring statement. " +
			"\rAll protagonists immediately heal 1 Wound.");
        }		
        else if (roll >= 47 && roll <= 48 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**A Kunnin’ Plan**] ' +
			"\r*Dis bit goes ‘ere, that bit goes there. That’s how you fix yer gubbinz. Now shut your yap and get to fightin!*" +
			"\rPlay after suffering a combat complication. The effect of the complication is immediately cancelled." +
			"\rYou gain 1 Wrath.");
        }		
        else if (roll >= 49 && roll <= 50 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Lootin’**] ' +
			"\r*Listen up. ya grots an’ squigs! Dey’z comin’ for us like we’z some kinda humie gitz! But we ain’t! We’re da Orks, and" +
			" dis is gonna be one GREAT FIGHT! So get your choppas and your shootas ready, boyz, ‘cos dere’s some killin’ ta do!*" +
			"\rPlay to locate, acquire, or otherwise produce a single item (Rarity value 3 or less) or 3 Reloads.");
        }		
        else if (roll >= 51 && roll <= 52 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**The Emperor Above All**] ' +
			"\r*A mind without purpose will wander in dark places.*" +
			"\rPlay during a combined action. All Icons (not just Exalted Icons) from assistant rolls add to the leader’s dice pool. " +
			"\rAdd 1 Glory.");
        }		
        else if (roll >= 53 && roll <= 54 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**Innocence Proves Nothing**] ' +
			"\r*There is no such thing as innocence, just varying degrees of guilt.*" +
			"\rPlay when making an Interaction Attack or using an Interaction skill outside of combat. You may add the relevant skill to" +
			" the dice pool again before rolling." +
			"\rYou gain 1 Wrath.");
        }		
        else if (roll == 55 )
        {
            messageEvent.channel.send(messageEvent.author + ': You have drawn: [**There is Only War**] ' +
			"\r*There is no peace among the stars, only an eternity of carnage and slaughter.*" +
			"\rPlay to have diplomacy break down while suspicion and aggression are on the rise. All Interaction skills other than" +
			" Intimidation suffer a +2DN penalty for the rest of the scene." +
			"\rAll protagonists gain 1 Wrath.");
        }
    }
}

function complication(messageEvent) //Complications Chart Roller !complication
{
    if (messageEvent.content == '!complication')
    {
        roll = (Math.ceil(Math.random() * 6) * 10) + (Math.ceil(Math.random() * 6));
        if (roll >= 11 && roll <= 26 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Combat Complication (' + roll + ")`: [**Out of Ammo**] \r*The weapon is out of" +
			" ammunition, and the character must expend one Reload to make the weapon ready to fire. If no Reloads remain, the weapon cannot be " + 
			"used until more Reloads are obtained.*");
        }
        else if (roll >= 31 && roll <= 33 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Combat Complication (' + roll + ")`: [**Weapon Jam**] \r*The current weapon " +
			"has a minor malfunction and ceases to work. A successful Tech test (DN 2) must be made to make the weapon functional again.*");
        }
        else if (roll >= 34 && roll <= 36 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Combat Complication (' + roll + ")`: [**Dropped Weapon**] \r*The character drops " +
			"the current weapon they are wielding. The weapon falls at the character’s feet. The character must spend an action to pick up their " +
			"weapon to wield it again.*");
        }
        else if (roll >= 41 && roll <= 43 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Combat Complication (' + roll + ")`: [**Weapon Malfunction**] \r*The current" + 
			" weapon has a spectacular malfunction. This can result in a plasma weapon getting hot, for example. The character can spend an" + 
			" action to make Tech test (DN 4) to repair the weapon.*");
        }
        else if (roll >= 44 && roll <= 46 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Combat Complication (' + roll + ")`: [**Weapon Stuck**] \r*The current weapon gets " + 
			"stuck in the environment: a wall, a tree, or some other object. The character must use an action and succeed at a Strength test" + 
			" (DN 3) to recover their weapon.*");
        }
        else if (roll >= 51 && roll <= 53 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Combat Complication (' + roll + ")`: [**Dropped Item**] \r*The character drops a" + 
			" random item from their wargear: a grenade, an extra weapon, a map or Data-slate, survival pack, or something else important the" + 
			" character is carrying on their person.*");
        }
        else if (roll >= 54 && roll <= 56 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Combat Complication (' + roll + ")`: [**Falling Prone**] \r*The character’s attack" + 
			" causes them to stumble or slip, resulting in the character falling prone.*");
        }
        else if (roll >= 61 && roll <= 62 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Combat Complication (' + roll + ")`: [**Restrained**] \r*The character’s attack" + 
			" causes them to become restrained. Perhaps the character’s footing is uncertain, or they have been entangled in something in" + 
			" the environment.*");
        }
        else if (roll >= 63 && roll <= 64 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Combat Complication (' + roll + ")`: [**Blind**] \r*The character’s attack causes" + 
			" them to become blinded. Perhaps the character’s attack punctured a steam pipe, blasted dust into the air, or caused some similar" + 
			" manner of obscuring their vision.*");
        }
        else if (roll >= 65 && roll <= 66 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Combat Complication (' + roll + ")`: [**Inconveinient Target**] \r*Something has" + 
			" gone very wrong with this attack. The strike hits a target that is very inconvenient for the current situation, such as an explosive" + 
			" fuel source, flammable materials, or the controls to extend a bridge across a chasm.*");
        }
    }
}


function vehicle(messageEvent) //Vehicle Complications Chart Roller !vehicle
{
    if (messageEvent.content == '!vehicle')
    {
        roll = (Math.ceil(Math.random() * 6));
        if (roll == 1 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Vehicle Critical Effect (' + roll + ")`: [**Weapon Breakdown**] \r*A random vehicle-" + 
			"mounted weapon suffers a complication.*");
        }
   	    else if (roll == 2 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Vehicle Critical Effect (' + roll + ")`: [**Spinout**] \r*Randomly change the direction " + 
			"the vehicle faces. All occupants take 1d3 Shock.*");
        }
	    else if (roll == 3 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Vehicle Critical Effect (' + roll + ")`: [**Shot Steering**] \r*Increase the DN of " + 
			"all stunts by 2. If this result is rolled a second time, in-crease the DN of stunts by an additional 2 and the vehicle cannot turn " + 
			"except by performing a Boot-leg Turn stunt.*");
        }
	    else if (roll == 4 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Vehicle Critical Effect (' + roll + ")`: [**Drive Compromised**] \r*The vehicle’s " + 
			"Cruising Speed is halved. If this result is rolled a second time, the vehicle cannot perform stunts and its Cruising Speed is reduced " + 
			"to one-fourth its original value.*");
        }
	    else if (roll == 5 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Vehicle Critical Effect (' + roll + ")`: [**Fuel Leak**] \r*The vehicle runs " + 
			"out of fuel at the end of the scene. If this result is rolled again, the vehicle runs out of fuel immediately and comes to a dead stop.*");
        }
	    else if (roll == 6 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Vehicle Critical Effect (' + roll + ")`: [**Blowout**] \r*The vehicle suffers +1d3 Wounds.*");
        }
    }
}

function voidship(messageEvent) //Voidship Complications Chart Roller !voidship
{
    if (messageEvent.content == '!voidship')
    {
        roll = (Math.ceil(Math.random() * 6));
        if (roll == 1 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Voidship Critical Effect (' + roll + ")`: [**Shield Collapse**] \r*The voidships " +
			"void shields are disabled.*");
        }
	    else if (roll == 2 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Voidship Critical Effect (' + roll + ")`: [**System Failure**] \r*A random voidship " + 
			"weapon or system is disabled.*");
        }
	    else if (roll == 3 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Voidship Critical Effect (' + roll + ")`: [**Crew Loss**] \r*A direct hit costs " + 
			"the lives of numberless crew. Increase the DN by 1 for of all system actions, combat options, and Ballistic Skill tests made to fire " + 
			"voidship weapons. Emergency Repairs cannot mitigate this effect. The penalties for Crew Loss are cumulative and can only be removed " + 
			"by hiring, conscripting, or press-ganging fresh crew at port.*");
        }
	    else if (roll == 4 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Voidship Critical Effect (' + roll + ")`: [**Engines Compromised**] \r*Reduce the " + 
			"vessel’s Cruising Speed by 2. If multiple instances of this result reduce a voidship’s Cruising Speed to 0, the vehicle cannot turn " + 
			"and drifts 1km along its last heading at the beginning of its turn.*");
        }
	    else if (roll == 5 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Voidship Critical Effect (' + roll + ")`: [**Hull Damage**] \r*The voidship suffers" + 
			" 1 Wound.*");
        }
	    else if (roll == 6 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Voidship Critical Effect (' + roll + ")`: [**Reactor Breach**] \r*The voidship’s " + 
			"reactor starts venting plasma. At the beginning of the voidship’s next turn, roll on this table and apply the result. If this roll " + 
			"results in a second reactor breach, the vessel loses power, reducing its Cruising Speed to 0 and disabling all its systems and weapons.*");
        }
    }
}

function injury(messageEvent) //Memorable Injury Chart Roller !injury
{
    if (messageEvent.content == '!injury')
    {
        roll = (Math.ceil(Math.random() * 6));
        if (roll >= 1 && roll <= 2 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Memorable Injury (' + roll + ")`: \r[**Result:**] *Battle Scar*" +
			"\r[**Escalation:**] *Fearsome Scar*");
        }
        else if (roll == 3 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Memorable Injury (' + roll + ")`: \r[**Result:**] *Focused Burn*" +
			"\r[**Escalation:**] *Severe Burn*");
        }
        else if (roll == 4 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Memorable Injury (' + roll + ")`: \r[**Result:**] *Broken Jaw*" +
			"\r[**Escalation:**] *Missing Fingers*");
        }
        else if (roll == 5 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Memorable Injury (' + roll + ")`: \r[**Result:**] *Twitch*" +
			"\r[**Escalation:**] *Bad Knee*");
        }
        else if (roll == 6 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Memorable Injury (' + roll + ")`: \r[**Result:**] *Torn Ear*" +
			"\r[**Escalation:**] *Nagging Wound*");
        }
    }
}

function maiming(messageEvent) //Maiming Chart Roller !maiming
{
    if (messageEvent.content == '!maiming')
    {
        roll = (Math.ceil(Math.random() * 6));
        rollSide = (Math.ceil(Math.random() * 6));
        if (rollSide <= 3)
        {
            side = "Left";
        }
        else
        {
            side = "Right";
        }
        if (roll == 1)
        {
            messageEvent.channel.send(messageEvent.author + ': `Maiming (' + roll + ":" + rollSide + ")`: [**" + side + " Hand**] \r*The character suffers a severe hand" + 
			" injury. The character may not use that hand to hold any items, weapons, or similar gear. Losing both hands means the character" + 
			" is unable to hold any items, weapons, or similar gear, and increases the difficulty by 6 to any test that requires a" + 
			" functioning hand.*");
        }
        else if (roll == 2 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Maiming (' + roll + ":" + rollSide + ")`: [**" + side + " Arm**] \r*The character suffers a severe injury" + 
			" to their arm. Losing both arms means the character is unable to hold any items, weapons, or similar gear, and increases the" + 
			" difficulty by 6 to any test that requires a functioning hand.*");
        }
        else if (roll == 3 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Maiming (' + roll + ":" + rollSide + ")`: [**" + side + " Foot**] \r*The character suffers a severe foot" + 
			" injury. Losing both feet means the character is unable to walk or run, and may only crawl (see page 212).*");
        }
        else if (roll == 4 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Maiming (' + roll + ":" + rollSide + ")`: [**" + side + " Leg**] \r*The character suffers a severe leg" + 
			" injury. Losing both legs means the character is unable to walk or run, and may only crawl (see page 212).*");
        }
        else if (roll == 5 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Maiming (' + roll + ")`: [**Torso**] \r*The character suffers a severe" + 
			" injury that impairs their organs, like the heart, lungs, or liver. This increases the difficulty of Toughness tests" + 
			" (including Soaking) by 2.*");
        }
        else if (roll == 6 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Maiming (' + roll + ":" + rollSide + ")`: [**" + side + " Eye**] \r*One of the character’s eyes has" + 
			" been damaged beyond repair. A single injured eye means that the character increases the difficulty of all ranged tests by" + 
			" 2. Losing both eyes means the character is blind and increases the difficulty to all tests that require sight by 6.*");
        }
    }
}

function trinket(messageEvent) //Trinket Chart Roller !trinket
{
    if (messageEvent.content == '!trinket')
    {
        chart = (Math.ceil(Math.random() * 3));
        table = parseInt(chart) * 100;
        d66 = (Math.ceil(Math.random() * 6) * 10) + (Math.ceil(Math.random() * 6));
        roll = parseInt(table) + parseInt(d66);
        if (roll == 111 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *An Ork tooth. A string of numbers is etched into the" + 
			" enamel.*");
        }
        else if (roll == 112  )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A phial of soil from your homeworld.*");
        }
        else if (roll == 113  )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A bent spanner from a hive world manufactorum.*");
        }
        else if (roll == 114  )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A small effigy of a Jokaero made from spare parts.*");
        }
        else if (roll == 115  )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A book of ribald poetry bound into the cover of a" + 
			" chronicle of an Imperial Saint.*");
        }
        else if (roll == 116  )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *Three pieces of dried alien fruit wrapped in wax" + 
			" paper.*");
        }
        else if (roll == 121  )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *The hilt of a Guard combat knife, the blade dissolved" + 
			" by acid.*");
        }
        else if (roll == 122  )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A canteen of rotgut brewed from corpse starches and" + 
			" thruster coolant.*");
        }
        else if (roll == 123  )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *An icon of Saint Celestine covering her face as if" + 
			" weeping.*");
        }
        else if (roll == 124  )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A shard of wraithbone. When unobserved, the shard" + 
			" orients itself to point galactic west.*");
        }
        else if (roll == 125  )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *The milky eye of an Astropath suspended in a vial" + 
			" of preservative fluid.*");
        }
        else if (roll == 126  )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A power cell incompatible with all known Imperium" + 
			" technology.*");
        }
        else if (roll == 131 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A pack of thick Astra Militarum issue socks, never" + 
			" opened.*");
        }
        else if (roll == 132 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A bottle of finest amasec brewed on a world lost" + 
			" on the far side of the Great Rift.*");
        }
        else if (roll == 133 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A leather pouch containing 1d6 seeds from a jungle" + 
			" world.*");
        }
        else if (roll == 134 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A book of confounding riddles with a blue and yellow" + 
			" cover and 99 pages.*");
        }
        else if (roll == 135 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A boot polish tin containing 1d6 lho sticks.*");
        }
        else if (roll == 136 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A necklace made of five regicide playing pieces on" + 
			" a silver chain.*");
        }
        else if (roll == 141 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A doll in the form of a Space Marine made from an" + 
			" old shirt.*");
        }
        else if (roll == 142 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A small plastic cube with arrows on four sides and" + 
			" reticules on two.*");
        }
        else if (roll == 143 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A data slate containing fragmentary maps of an" + 
			" ancient vessel lost in the warp.*");
        }
        else if (roll == 144 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A thick tome of the Imperial Creed, its cover" + 
			" sealed closed by an archaic lock.*");
        }
        else if (roll == 145 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *The ident tags of a long-dead soldier of the" + 
			" Imperial Guard.*");
        }
        else if (roll == 146 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A counterfeit Administratum notary seal carved" + 
			" from a starchy tuber.*");
        }
        else if (roll == 151 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A bucket of foul smelling red paint that cannot" + 
			" be washed off.*");
        }
        else if (roll == 152 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A sheaf of Imperial Guard enlistment papers, never" + 
			" filled out.*");
        }
        else if (roll == 153 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *The severed finger of a Space Marine power fist," + 
			" its markings inconsistent with any known Chapter.*");
        }
        else if (roll == 154 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *An ornate child’s puzzle box. When solved, the box" + 
			" exposes a disquieting symbol.*");
        }
        else if (roll == 155 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A pict of a distant relation. Their face shows signs" + 
			" of subtle mutation.*");
        }
        else if (roll == 156 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *An Explorator’s journal, strange plant clippings" + 
			" and insects pressed between the pages.*");
        }
        else if (roll == 161 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A single card of the Emperor’s Tarot baring a name" + 
			" hastily written in blood.*");
        }
        else if (roll == 162 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A magnetised piece of scrap metal showing an Ork glyph." + 
			" It takes great force to remove the chit once attached.*");
        }
        else if (roll == 163 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A copy of the Imperial Infantryman’s Uplifting Primer." + 
			" The book is bloodstained and charred from the impact of an energy weapon.*");
        }
        else if (roll == 164 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *An unread message from someone important on your homeworld.*");
        }
        else if (roll == 165 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A fur hat made from the tufted crest of an Eldar" + 
			" Exarch’s helmet.*");
        }
        else if (roll == 166 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A pilgrim’s token from Holy Terra.*");
        }
        else if (roll == 211 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A cheap copy of a Ministorum seal made from moulded" + 
			" resin covered in a patina of metal.*");
        }
        else if (roll == 212 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A polymorphine ampoule jury-rigged to hold a" + 
			" preserved blood sample.*");
        }
        else if (roll == 213 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *The dedication plaque of a Dauntless-class Light" + 
			" Cruiser thought lost during a crusade.*");
        }
        else if (roll == 214 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A faint vox-recording of a parent’s last words.*");
        }
        else if (roll == 215 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A page torn from a sacred text of the Imperial Creed" + 
			" bearing a black smudge in the centre.*");
        }
        else if (roll == 216 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A diadem from a feudal world, its perimeter" + 
			" decorated with xenos claws.*");
        }
        else if (roll == 221 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *An antique chrono that always runs fifteen" + 
			" minutes fast.*");
        }
        else if (roll == 222 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A jawbone, supposedly from a saint, with High" + 
			" Gothic script worked into its surface in delicate scrimshaw.*");
        }
        else if (roll == 223 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *An unfired bolt round, initials carved into" + 
			" its surface.*");
        }
        else if (roll == 224 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A necklace of Imperial coins from various worlds" + 
			" strung on silver wire. The coins are worth just enough to pay for a funeral.*");
        }
        else if (roll == 225 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A wind instrument made from meteoric iron that" + 
			" requires six fingers on each hand to play properly.*");
        }
        else if (roll == 226 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A purity seal stamped with a grinning skull.*");
        }
        else if (roll == 231 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A book of dirty limericks and bawdy verse" + 
			" written in Low Gothic.*");
        }
        else if (roll == 232 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A box containing a set of tiny icons of" + 
			" various warriors. The box includes a set of knucklebones.*");
        }
        else if (roll == 233 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A tiny servitor made from the remains of" + 
			" an avian believed native to Holy Terra. It sings sweetly, never repeating a tune.*");
        }
        else if (roll == 234 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A gauzy crimson sash woven from mono-fibre" + 
			" once used to garrotte a treasonous Sub-Sector governor.*");
        }
        else if (roll == 235 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A marble hand broken off an Imperial monument," + 
			" its surface stained with Ork blood.*");
        }
        else if (roll == 236 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *Three corroded, magnetised ball bearings. Each" + 
			" is engraved with markings mimicking the continents of alien worlds.*");
        }
        else if (roll == 241 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A lighter in the shape of a compact laspistol." + 
			" Pulling the trigger produces a tiny, steady chemical flame from the barrel.*");
        }
        else if (roll == 242 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A sheaf of grave rubbings taken from multiple" + 
			" headstones bearing the same name but different dates of birth and death.*");
        }
        else if (roll == 243 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A shard of stained glass from a fallen cathedral.*");
        }
        else if (roll == 244 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *The spent power cell of a Tau pulse pistol modified" + 
			" to fit a standard laspistol.*");
        }
        else if (roll == 245 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *The command codes for a highly specific class of" + 
			" Cherub servitors.*");
        }
        else if (roll == 246 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A signet ring bearing the seal of a Questor" + 
			" Imperialis unheard of since the opening of the Great Rift.*");
        }
        else if (roll == 251 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A battered Astra Militarum survival kit. Its " + 
			"contents spent except for three water purification tablets.*");
        }
        else if (roll == 252 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A crystal bottle of intoxicating perfume made" + 
			" from gyrinx musk glands.*");
        }
        else if (roll == 253 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A tattered flag showing an Ork emblem of an infamous" + 
			" Freebooter Kaptin.*");
        }
        else if (roll == 254 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A sealed bottle of red corrective ink baring the" + 
			" label of the Adeptus Administratum.*");
        }
        else if (roll == 255 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A braided lock of synthetic hair.*");
        }
        else if (roll == 256 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A signed second volume of the memoirs of an" + 
			" Imperial hero.*");
        }
        else if (roll == 261 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A burned-out memetic coil from a servitor skull.*");
        }
        else if (roll == 262 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *Sealed orders meant for a long-dead Lord Marshal" + 
			" of the Imperial Guard.*");
        }
        else if (roll == 263 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A battle damaged ID chip from a Tau Fire Warrior.*");
        }
        else if (roll == 264 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A stale wafer of hard tack from a Militarum" + 
			" commissary, hard and thick enough to stop a slug round.*");
        }
        else if (roll == 265 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A diamantine tuning fork engraved with the seal" + 
			" of a Quire Master of the Adeptus Ministorum.*");
        }
        else if (roll == 266 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A deck of playing cards. Each card bares the image" + 
			" of an enemy of the Imperium.*");
        }
        else if (roll == 311 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A vox recording of haunting xenos music from a" + 
			" species long thought extinct.*");
        }
        else if (roll == 312 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A death mask in the image of a Canoness of the" + 
			" Adepta Sororitas.*");
        }
        else if (roll == 313 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A reliquary containing a shard of gleaming ice." + 
			" The ice never melts.*");
        }
        else if (roll == 314 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A wafer-thin sheet of wraithbone covered in" + 
			" interconnected Eldar glyphs.*");
        }
        else if (roll == 315 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *An improvised pendulum made from a length of" + 
			" optic cable and an autogun slug.*");
        }
        else if (roll == 316 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A portable autoquill modified to print Ork glyphs.*");
        }
        else if (roll == 321 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A shrill whistle carved from the preserved " + 
			"horn of a daemon.*");
        }
        else if (roll == 322 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *An Imperial noble’s commissioning scroll," + 
			" signed and notarised, dated three standard years in the future.*");
        }
        else if (roll == 323 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A rockcrete brick pried from the defensive " + 
			"wall of a fallen Imperial bastion.*");
        }
        else if (roll == 324 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A forged promissory note from an upstanding" + 
			" Guild on a nearby hive world.*");
        }
        else if (roll == 325 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A ring of keys, each one encoded to a stasis" + 
			" vault on a different world.*");
        }
        else if (roll == 326 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A list of seemingly unrelated machine components" + 
			" written in blocky, crabbed handwriting.*");
        }
        else if (roll == 331 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *An ornate silver snuffbox. The snuff within is" + 
			" fortified with trace amounts of xenos pollen.*");
        }
        else if (roll == 332 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A fetish carved from volcanic glass depicting a" + 
			" skull-faced god sitting on a gothic throne.*");
        }
        else if (roll == 333 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A ticket stub for a performance of an opera" + 
			" proscribed by the Ecclesiarchy.*");
        }
        else if (roll == 334 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A dog-eared, lavishly illustrated children’s" + 
			" primer of Imperial history.*");
        }
        else if (roll == 335 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A classified document, redacted so that every" + 
			" word is blacked out except for “crucible”.*");
        }
        else if (roll == 336 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *Coded data-slate of a significant human bloodline" + 
			" showing possible mutation and xenos gene-grafting.*");
        }
        else if (roll == 341 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A five-minute sand timer filled with the ruddy" + 
			" sand of Mars.*");
        }
        else if (roll == 342 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *Half of a shattered mask depicting a face" + 
			" distorted with fear.*");
        }
        else if (roll == 343 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A smooth river stone with an Aeldari glyph carved" + 
			" into its surface.*");
        }
        else if (roll == 344 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *An eight-spoked cogwheel.*");
        }
        else if (roll == 345 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A small triptych of the God-Emperor ascendant," + 
			" martyred, and interred upon the Golden Throne. The hinges are rusted shut.*");
        }
        else if (roll == 346 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *The remote detonator to a Penal Legionnaire’s" + 
			" explosive collar.*");
        }
        else if (roll == 351 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A xenohide pouch containing the mummified heart" + 
			" of an unknown organism.*");
        }
        else if (roll == 352 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A radiation-damaged design template for a plasma" + 
			" reactor with a single fatal design flaw.*");
        }
        else if (roll == 353 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *An exhaustive phrase book translating common phrases" + 
			" between multiple dialects of Low Gothic.*");
        }
        else if (roll == 354 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *The knob from the end of a weirdboy’s channeling rod.*");
        }
        else if (roll == 355 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A clockwork replica of an attack bike that sparks" + 
			" and runs in circles when wound.*");
        }
        else if (roll == 356 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A sash made from the interlocking scales of a Maiden" + 
			" World reptile.*");
        }
        else if (roll == 361 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *An illuminated book of hours. Many of the prayers" + 
			" within are edited in red ink.*");
        }
        else if (roll == 362 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A prism-like mirror shard. Staring at one’s own " + 
			"reflection in the shard causes vivid hallucinations.*");
        }
        else if (roll == 363 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A piece of ceramite marked with the emblem of a " + 
			"Space Marine Chapter.*");
        }
        else if (roll == 364 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *Several lengths of ribbed cable meant to be worn" + 
			" around the head and neck, giving the wearer the appearance of possessing several high-quality augmetic implants.*");
        }
        else if (roll == 365 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A bottle of sacramental wine blessed by an" + 
			" Arch-Deacon of the Adeptus Ministorum.*");
        }
        else if (roll == 366 )
        {
            messageEvent.channel.send(messageEvent.author + ': `Trinket (' + chart + ':' + d66 + ")`: *A cheap replica of an Arbitrator’s badge of office.*");
        }
        
    }
}

bot.login(process.env.BOT_TOKEN);
