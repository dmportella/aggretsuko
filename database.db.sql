BEGIN TRANSACTION;
-- generic player register
CREATE TABLE IF NOT EXISTS `players` ( 
    `discordId` NUMERIC NOT NULL UNIQUE, 
    `username` TEXT NOT NULL, 
    PRIMARY KEY(`discordId`) );
-- event attendance
CREATE TABLE IF NOT EXISTS "events" ( 
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, 
    `ownerId` TEXT NOT NULL, 
    `messageId` NUMERIC NOT NULL, 
    `message` TEXT NOT NULL, 
    `created` TEXT NOT NULL, 
    `closed` TEXT NULL, 
    `eventTime` TEXT );
CREATE TABLE IF NOT EXISTS `attendance` ( 
    `eventId` INTEGER NOT NULL, 
    `discordId` NUMERIC NOT NULL, 
    `signupTime` TEXT NOT NULL, 
    `attended` TEXT );
-- BDO stuff
CREATE TABLE IF NOT EXISTS `gearScores` ( 
    `discordId` NUMERIC NOT NULL UNIQUE, 
    `updated` TEXT NULL, 
    `score` NUMERIC NOT NULL, 
    PRIMARY KEY(`discordId`) );
COMMIT;
