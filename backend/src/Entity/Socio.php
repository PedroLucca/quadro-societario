<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

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

    #[ORM\ManyToMany(targetEntity: Empresa::class, inversedBy: "socios")]
    #[ORM\JoinTable(name: "socio_empresas")]
    private Collection $empresas;

    public function __construct()
    {
        $this->empresas = new ArrayCollection();
    }

    public function getId(): int { return $this->id; }
    public function getNome(): string { return $this->nome; }
    public function setNome(string $nome): void { $this->nome = $nome; }

    public function getCpf(): string { return $this->cpf; }
    public function setCpf(string $cpf): void { $this->cpf = $cpf; }

    /**
     * @return Collection<int, Empresa>
     */
    public function getEmpresas(): Collection
    {
        return $this->empresas;
    }

    public function addEmpresa(Empresa $empresa): void
    {
        if (!$this->empresas->contains($empresa)) {
            $this->empresas[] = $empresa;
            $empresa->addSocio($this);
        }
    }

    public function removeEmpresa(Empresa $empresa): void
    {
        if ($this->empresas->contains($empresa)) {
            $this->empresas->removeElement($empresa);
            $empresa->removeSocio($this);
        }
    }

    public function toArray(): array
    {
        return [
            'id' => $this->getId(),
            'nome' => $this->getNome(),
            'cpf' => $this->getCpf(),
            'empresas' => $this->getEmpresas()->map(fn(Empresa $empresa) => $empresa->toArray())->toArray(),
        ];
    }
}