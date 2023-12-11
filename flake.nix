{
  description = "Aylurs default config files for ags";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    pkgs = import nixpkgs {
      system = "x86_64-linux";
      overlays = [self.overlays.default];
    };

    mkAgsDots = {
      pname,
      version,
    }:
      with pkgs; let
        libs = [stdenv.cc.cc.lib];
      in
        stdenv.mkDerivation {
          inherit pname version;
          src = ./ags-config;
          installPhase = ''
            mkdir -p $out
          '';
          #cp -r ${src}/* $out
        };
  in {
    overlays.default = final: prev: {
      aylurs-dots = mkAgsDots {
        pname = "aylurs-dots";
        version = "1";
      };
    };

    lib.mkAgsDots = mkAgsDots;

    packages.x86_64-linux = rec {
      inherit
        (pkgs)
        aylurs-dots
        ;
      default = aylurs-dots;
    };
  };
}
