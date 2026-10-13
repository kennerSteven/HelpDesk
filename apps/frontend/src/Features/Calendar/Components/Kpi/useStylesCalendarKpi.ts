export default function  useStylesCalendarKpi() {
    

    function getDaysBadge(daysBetween: number | undefined) {
      const days = daysBetween ?? 0;
    
      // 1. Días negativos -> Estado retrasada
      if (days < 0) {
        return {
          label: "Retrasada",
          hasDot: true,
          dotClass: "bg-red-500 animate-pulse",
          containerClass: "bg-red-50 text-red-600 border border-red-200/80",
        };
      }
    
      // 2. daysBetween === 0 -> Hoy
      if (days === 0) {
        return {
          label: "Hoy",
          hasDot: true,
          dotClass: "bg-rose-500",
          containerClass: "bg-rose-50/70 text-rose-600 border border-rose-200/80",
        };
      }
    
      // 3. daysBetween === 1 -> Mañana
      if (days === 1) {
        return {
          label: "Mañana",
          hasDot: true,
          dotClass: "bg-amber-500",
          containerClass:
            "bg-amber-50/80 text-amber-700 border border-amber-300/80",
        };
      }
    
      // 4. daysBetween === 3 o mayor a 1 -> Estilo gris "En X días"
      return {
        label: days === 3 ? "En 3 días" : `En ${days} días`,
        hasDot: false,
        dotClass: "",
        containerClass:
          "bg-slate-100/70 text-slate-600 border border-slate-200/80 font-medium",
      };
    }
    
    function getStatusBadge(status?: string) {
      const s = status || "Pendiente";
      const lower = s.toLowerCase();
    
      if (lower.includes("curso") || lower.includes("progreso")) {
        return {
          label: s,
          className: "bg-sky-50 text-sky-600",
        };
      }
    
      if (
        lower.includes("revisión") ||
        lower.includes("revision") ||
        lower.includes("review")
      ) {
        return {
          label: s,
          className: "bg-purple-50 text-purple-600",
        };
      }
    
      if (lower.includes("pendiente") || lower.includes("todo")) {
        return {
          label: s,
          className: "bg-emerald-50 text-emerald-600",
        };
      }
    
      return {
        label: s,
        className: "bg-slate-100 text-slate-700",
      };
    }
    
    
    function getPriorityBadge(priority?: string) {
      const p = (priority || "").toUpperCase().trim();
    
      if (
        p === "HIGH" 
      ) {
        return {
          label: "ALTA",
          className: "bg-red-50 text-red-600 border border-red-200/80",
        };
      }
    
      if (p === "MEDIUM" ) {
        return {
          label: "MEDIA",
          className: "bg-amber-50 text-amber-700 border border-amber-300/80",
        };
      }
    
      if (p === "LOW" ) {
        return {
          label: "BAJA",
          className: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
        };
      }
    
      return {
        label: p || "MEDIA",
        className: "bg-amber-50 text-amber-700 border border-amber-300/80",
      };
    }

    return{
        getDaysBadge,getStatusBadge,getPriorityBadge
    }
}