<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity]
#[ORM\Table(name: "usuarios")]
class Usuario implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private int $id;

    #[ORM\Column(type: "string", length: 255)]
    private string $nome;

    #[ORM\Column(type: "string", length: 255, unique: true)]
    private string $email;

    #[ORM\Column(type: "string", length: 255)]
    private string $senha;

    #[ORM\Column(type: "string", nullable: true)]
    private ?string $token = null;

    #[ORM\Column(type: "datetime_immutable", nullable: true)]
    private ?\DateTimeImmutable $tokenExpiracao = null;

    // Getters e Setters

    public function getId(): int { return $this->id; }
    
    public function getNome(): string { return $this->nome; }
    public function setNome(string $nome): void { $this->nome = $nome; }
    
    public function getEmail(): string { return $this->email; }
    public function setEmail(string $email): void { $this->email = $email; }

    public function getSenha(): string { return $this->senha; }
    public function setSenha(string $senha): void { $this->senha = $senha; }

    public function getToken(): ?string { return $this->token; }
    public function setToken(?string $token): void { $this->token = $token; }

    public function getTokenExpiracao(): ?\DateTimeImmutable { return $this->tokenExpiracao; }
    public function setTokenExpiracao(?\DateTimeInterface $tokenExpiracao): void
    {
        if ($tokenExpiracao instanceof \DateTime) {
            // Converte \DateTime para \DateTimeImmutable
            $this->tokenExpiracao = \DateTimeImmutable::createFromMutable($tokenExpiracao);
        } elseif ($tokenExpiracao instanceof \DateTimeImmutable) {
            // Já é \DateTimeImmutable, apenas atribui
            $this->tokenExpiracao = $tokenExpiracao;
        } else {
            // Caso seja null ou outro tipo
            $this->tokenExpiracao = null;
        }
    }

    public function isTokenValido(): bool
    {
        return $this->tokenExpiracao !== null && $this->tokenExpiracao > new \DateTimeImmutable();
    }

    // Implementação das interfaces, isso foi necessário para facilitar a implementação da senha com hash

    public function getRoles(): array
    {
        return ['ROLE_USER'];
    }

    public function getPassword(): string
    {
        return $this->senha;
    }

    public function getSalt(): ?string
    {
        return null;
    }

    public function eraseCredentials(): void
    {
   
    }

    public function getUsername(): string
    {
        return $this->email;
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }
}