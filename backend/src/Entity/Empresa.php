<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
#[ORM\Table(name: "empresas")]
class Empresa
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private int $id;

    #[ORM\Column(type: "string", length: 255)]
    private string $nome;

    #[ORM\Column(type: "string", length: 14, unique: true)]
    private string $cnpj;

    #[ORM\Column(type: "string", length: 255)]
    private string $endereco;

    #[ORM\ManyToMany(targetEntity: Socio::class, mappedBy: "empresas")]
    private Collection $socios;

    public function __construct()
    {
        $this->socios = new ArrayCollection();
    }

    public function getId(): int { return $this->id; }
    public function getNome(): string { return $this->nome; }
    public function setNome(string $nome): void { $this->nome = $nome; }

    public function getCnpj(): string { return $this->cnpj; }
    public function setCnpj(string $cnpj): void { $this->cnpj = $cnpj; }

    public function getEndereco(): string { return $this->endereco; }
    public function setEndereco(string $endereco): void { $this->endereco = $endereco; }

    /**
     * @return Collection<int, Socio>
     */
    public function getSocios(): Collection
    {
        return $this->socios;
    }

    public function addSocio(Socio $socio): void
    {
        if (!$this->socios->contains($socio)) {
            $this->socios[] = $socio;
            $socio->addEmpresa($this);
        }
    }

    public function removeSocio(Socio $socio): void
    {
        if ($this->socios->contains($socio)) {
            $this->socios->removeElement($socio);
            $socio->removeEmpresa($this);
        }
    }

    public function toArray(): array
    {
        return [
            'id' => $this->getId(),
            'nome' => $this->getNome(),
            'cnpj' => $this->getCnpj(),
            'endereco' => $this->getEndereco(),
        ];
    }

    public function toFullArray(): array
    {
        return [
            'id' => $this->getId(),
            'nome' => $this->getNome(),
            'cnpj' => $this->getCnpj(),
            'endereco' => $this->getEndereco(),
            'socios' => $this->getSocios()->map(fn(Socio $socio) => $socio->toArray())->toArray(),
        ];
    }
}