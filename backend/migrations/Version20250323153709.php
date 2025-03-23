<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250323153709 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE usuarios ADD nome VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE usuarios ADD token_expiracao TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL');
        $this->addSql('ALTER TABLE usuarios ALTER email TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE usuarios ALTER token TYPE VARCHAR(255)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE usuarios DROP nome');
        $this->addSql('ALTER TABLE usuarios DROP token_expiracao');
        $this->addSql('ALTER TABLE usuarios ALTER email TYPE VARCHAR(180)');
        $this->addSql('ALTER TABLE usuarios ALTER token TYPE VARCHAR(64)');
    }
}
