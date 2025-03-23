<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250323035457 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Remove coluna empresa_id de socios';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE socios DROP COLUMN empresa_id');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE socios ADD empresa_id INT DEFAULT NULL');
    }
}
