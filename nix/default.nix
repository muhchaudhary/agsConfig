{
  lib,
  stdenvNoCC,
  fetchFromGitHub,
  ...
}:
stdenv.mkDerivation {
  pname = "aylurs-dots";
  version = "1";

  buildCommand = ''
    mkdir -p $out && cp -r ../src/* $out
  '';
}
