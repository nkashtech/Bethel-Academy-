-- CreateTable
CREATE TABLE `Enquiry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parentName` VARCHAR(120) NOT NULL,
    `email` VARCHAR(160) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `grade` VARCHAR(20) NOT NULL,
    `curriculum` VARCHAR(60) NOT NULL,
    `status` ENUM('NEW', 'CONTACTED', 'ENROLLED', 'CLOSED') NOT NULL DEFAULT 'NEW',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Enquiry_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parentName` VARCHAR(120) NOT NULL,
    `email` VARCHAR(160) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `address` VARCHAR(250) NOT NULL,
    `studentName` VARCHAR(120) NOT NULL,
    `studentDob` DATE NOT NULL,
    `pathway` VARCHAR(30) NOT NULL,
    `previousSchooling` VARCHAR(200) NOT NULL,
    `startDate` VARCHAR(30) NOT NULL,
    `comments` TEXT NULL,
    `status` ENUM('NEW', 'CONTACTED', 'ENROLLED', 'CLOSED') NOT NULL DEFAULT 'NEW',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Application_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consultation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(160) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `preferredDate` DATE NOT NULL,
    `preferredTime` VARCHAR(40) NOT NULL,
    `topic` TEXT NULL,
    `status` ENUM('NEW', 'CONTACTED', 'ENROLLED', 'CLOSED') NOT NULL DEFAULT 'NEW',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Consultation_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
