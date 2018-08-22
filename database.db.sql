BEGIN TRANSACTION;
-- generic player register
CREATE TABLE IF NOT EXISTS `players` ( `discordId` NUMERIC NOT NULL UNIQUE, `username` TEXT NOT NULL, PRIMARY KEY(`discordId`) );
-- event attendance
CREATE TABLE IF NOT EXISTS "events" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `ownerId` TEXT NOT NULL, `messageId` NUMERIC NOT NULL, `message` TEXT NOT NULL, `created` TEXT NOT NULL, `eventTime` TEXT );
CREATE TABLE IF NOT EXISTS `attendance` ( `eventId` INTEGER NOT NULL, `playerId` NUMERIC NOT NULL, `signupTime` TEXT NOT NULL, `attended` TEXT );
-- BDO stuff
CREATE TABLE IF NOT EXISTS `classes` ( `discordId` NUMERIC NOT NULL UNIQUE, `class` TEXT NOT NULL, PRIMARY KEY(`discordId`) );
CREATE TABLE IF NOT EXISTS `gearScores` ( `discordId` NUMERIC NOT NULL UNIQUE, `score` NUMERIC NOT NULL, PRIMARY KEY(`discordId`) );
COMMIT;
