<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "socios")]
class Socio
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private int $id;

    #[ORM\Column(type: "string", length: 255)]
    private string $nome;

    #[ORM\Column(type: "string", length: 11)]
    private string $cpf;

    #[ORM\ManyToOne(targetEntity: Empresa::class, inversedBy: "socios")]
    #[ORM\JoinColumn(nullable: false)]
    private Empresa $empresa;

    public function getId(): int { return $this->id; }
    public function getNome(): string { return $this->nome; }
    public function setNome(string $nome): void { $this->nome = $nome; }

    public function getCpf(): string { return $this->cpf; }
    public function setCpf(string $cpf): void { $this->cpf = $cpf; }

    public function getEmpresa(): Empresa { return $this->empresa; }
    public function setEmpresa(Empresa $empresa): void { $this->empresa = $empresa; }
}
