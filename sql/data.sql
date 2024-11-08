CREATE DATABASE IF NOT EXISTS nodejs_rest_demo;
USE nodejs_rest_demo;

/* Optional steps to create a user
CREATE USER 'chas'@'%' IDENTIFIED BY 'secret-password';
GRANT ALL PRIVILEGES ON nodejs_rest_demo.* TO 'chas'@'%';
FLUSH PRIVILEGES;
*/

CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS item (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2) NOT NULL
);

INSERT INTO item (name, description, price) VALUES
('Phoenix Feather Charm', 'A fiery red feather charm that grants courage and warmth. Perfect for protection in dark alleys.', 25.99),
('Ghost Whisperer''s Pendant', 'A silver pendant that allows the wearer to hear whispers from the beyond. Limited to one hour of use per day.', 42.50),
('Vampire''s Blood Wine', 'A rich, dark wine with a hint of iron, specially crafted for vampire patrons. Non-alcoholic.', 18.75),
('Grimoire of Shadows', 'A leather-bound book containing spells and hexes for beginners. Requires focus and practice.', 60.00),
('Werewolf''s Howl Amulet', 'An amulet that captures the essence of a wolf''s howl, bringing out courage and resilience.', 33.20),
('Potion of Invisibility (3 uses)', 'A vial containing three doses of invisibility. Perfect for avoiding unwanted attention.', 78.99),
('Magician''s Wand (Basic)', 'A sturdy wand made of enchanted oak, ideal for beginners in spellcasting.', 55.00),
('Dragon Scale Armor', 'A light but durable piece of armor made from discarded dragon scales. Provides exceptional protection.', 220.00),
('Potion of Healing', 'A small vial of potion that restores vitality and heals minor wounds.', 12.99),
('Nightshade Powder', 'A fine, dark powder used in various hexes and curses. Handle with care.', 15.00),
('Enchanted Ink (Bottle)', 'Ink that appears invisible until exposed to moonlight. Ideal for secret messages.', 8.50),
('Banshee''s Wail Crystal', 'A small crystal that, when broken, emits the scream of a banshee. For emergencies only.', 45.75),
('Fireproof Cloak', 'A cloak woven with fire-resistant fibers, offering protection against flames and extreme heat.', 120.00),
('Gargoyle Statue (Mini)', 'A small gargoyle figurine that watches over its owner, providing a sense of security.', 30.25),
('Alchemy Starter Kit', 'Contains the basics needed to start brewing potions, including vials and rare herbs.', 48.99),
('Silver Stake', 'A polished silver stake, effective against vampires and other dark creatures.', 75.00),
('Potion of Enhanced Vision', 'A temporary potion that enhances eyesight, perfect for nighttime exploration.', 20.00),
('Whispering Willow Wand', 'A delicate wand made from willow wood, known to strengthen whisper spells and secrets.', 65.00),
('Charmed Compass', 'A compass that points to the nearest source of magical energy. Highly sought after by adventurers.', 39.99),
('Spectral Lantern', 'A ghostly lantern that emits an eerie green glow, perfect for exploring haunted places.', 27.99),
('Cursed Coin', 'A single gold coin that brings misfortune to anyone who possesses it for too long.', 9.00),
('Necromancer''s Candle', 'A black candle that burns with a purple flame, used to commune with spirits.', 16.75),
('Potion of Swiftness', 'A potion that grants the drinker enhanced speed for a short period. Popular among rogue-types.', 21.50),
('Enchanted Mirror Shard', 'A shard from a broken enchanted mirror, allows glimpses into other worlds.', 30.00),
('Moonlit Dagger', 'A finely crafted dagger that glows faintly in moonlight, favored by shadowy figures.', 52.00),
('Bewitched Quill', 'A quill that writes on its own, responding to the user’s thoughts. Limited ink capacity.', 18.50),
('Elemental Crystal (Water)', 'A water-infused crystal that can summon a small amount of water in times of need.', 14.99),
('Ghoul Repellant', 'A potent mix that repels ghouls and lesser undead, effective for one use.', 23.00),
('Vial of Mermaid Tears', 'A rare vial of tears collected from a mermaid. Said to grant peaceful dreams.', 50.75),
('Familiar''s Collar', 'A collar imbued with protective charms, designed for magical familiars.', 12.00);
