//go:build windows

// ===========================================================================
// fenetre_windows.go — Ouverture en plein écran.
//
// go-webview2 ne sait créer la fenêtre qu'à une taille donnée. On l'agrandit
// donc juste après, par l'appel Windows ShowWindow(SW_MAXIMIZE) : la fenêtre
// occupe tout l'écran, la barre des tâches reste accessible, et rien n'est à
// faire défiler.
// ===========================================================================
package main

import (
	"syscall"
	"unsafe"
)

const swMaximize = 3

func agrandir(hwnd unsafe.Pointer) {
	if hwnd == nil {
		return
	}
	showWindow := syscall.NewLazyDLL("user32.dll").NewProc("ShowWindow")
	_, _, _ = showWindow.Call(uintptr(hwnd), swMaximize)
}
