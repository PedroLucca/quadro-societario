<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250323043202 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE socio_empresas (socio_id INT NOT NULL, empresa_id INT NOT NULL, PRIMARY KEY(socio_id, empresa_id))');
        $this->addSql('CREATE INDEX IDX_829BB1E1DA04E6A9 ON socio_empresas (socio_id)');
        $this->addSql('CREATE INDEX IDX_829BB1E1521E1991 ON socio_empresas (empresa_id)');
        $this->addSql('ALTER TABLE socio_empresas ADD CONSTRAINT FK_829BB1E1DA04E6A9 FOREIGN KEY (socio_id) REFERENCES socios (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE socio_empresas ADD CONSTRAINT FK_829BB1E1521E1991 FOREIGN KEY (empresa_id) REFERENCES empresas (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE socio_empresas DROP CONSTRAINT FK_829BB1E1DA04E6A9');
        $this->addSql('ALTER TABLE socio_empresas DROP CONSTRAINT FK_829BB1E1521E1991');
        $this->addSql('DROP TABLE socio_empresas');
    }
}
