<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250321173352 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE empresas_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE socios_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE empresas (id INT NOT NULL, nome VARCHAR(255) NOT NULL, cnpj VARCHAR(14) NOT NULL, endereco VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_70DD49A5C8C6906B ON empresas (cnpj)');
        $this->addSql('CREATE TABLE socios (id INT NOT NULL, empresa_id INT NOT NULL, nome VARCHAR(255) NOT NULL, cpf VARCHAR(11) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_62EAC1FC521E1991 ON socios (empresa_id)');
        $this->addSql('ALTER TABLE socios ADD CONSTRAINT FK_62EAC1FC521E1991 FOREIGN KEY (empresa_id) REFERENCES empresas (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE empresas_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE socios_id_seq CASCADE');
        $this->addSql('ALTER TABLE socios DROP CONSTRAINT FK_62EAC1FC521E1991');
        $this->addSql('DROP TABLE empresas');
        $this->addSql('DROP TABLE socios');
    }
}
