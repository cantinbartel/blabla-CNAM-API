-- CreateTable
CREATE TABLE `User` (
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('BASIC', 'EDITOR', 'ADMIN') NOT NULL DEFAULT 'BASIC',
    `centerId` VARCHAR(191) NOT NULL,
    `fieldId` VARCHAR(191) NOT NULL,
    `blackListed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Center` (
    `id` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Field` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Journey` (
    `id` VARCHAR(191) NOT NULL,
    `departureId` VARCHAR(191) NOT NULL,
    `arrivalId` VARCHAR(191) NOT NULL,
    `departureTime` DATETIME(3) NOT NULL,
    `EstimatedArrivalTime` DATETIME(3) NOT NULL,
    `driverId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Passenger` (
    `userId` VARCHAR(191) NOT NULL,
    `journeyId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `journeyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CenterToField` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CenterToField_AB_unique`(`A`, `B`),
    INDEX `_CenterToField_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_centerId_fkey` FOREIGN KEY (`centerId`) REFERENCES `Center`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_fieldId_fkey` FOREIGN KEY (`fieldId`) REFERENCES `Field`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Journey` ADD CONSTRAINT `Journey_departureId_fkey` FOREIGN KEY (`departureId`) REFERENCES `Center`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Journey` ADD CONSTRAINT `Journey_arrivalId_fkey` FOREIGN KEY (`arrivalId`) REFERENCES `Center`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Journey` ADD CONSTRAINT `Journey_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `User`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passenger` ADD CONSTRAINT `Passenger_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passenger` ADD CONSTRAINT `Passenger_journeyId_fkey` FOREIGN KEY (`journeyId`) REFERENCES `Journey`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CenterToField` ADD CONSTRAINT `_CenterToField_A_fkey` FOREIGN KEY (`A`) REFERENCES `Center`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CenterToField` ADD CONSTRAINT `_CenterToField_B_fkey` FOREIGN KEY (`B`) REFERENCES `Field`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
