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

          buildCommand = ''
            mkdir -p $out && ls -altr && cp -r ./src/* $out
          '';
        };
  in {
    overlays.default = final: prev: {
      aylurs-dots_1 = mkAgsDots {
        pname = "aylurs-dots";
        version = "1";
      };
    };

    lib.mkAgsDots = mkAgsDots;

    packages.x86_64-linux = rec {
      inherit
        (pkgs)
        aylurs-dots_1
        ;
      default = aylurs-dots_1;
    };
  };
}
