import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, RefreshCw } from "lucide-react";

/** =========================
 *  SAFE TYPES (FIX)
 ========================== */
type AnyUser = any;
type AnyLead = any;
type AnyReseller = any;
type AnyReferral = any;

/** =========================
 *  SAFE HELPER (CRASH FIX)
 ========================== */
const safeArray = <T,>(data: T[] | null | undefined): T[] => data ?? [];

/** =========================
 *  BLANK RESELLER
 ========================== */
const BLANK_RESELLER = {
  name: "",
  email: "",
  phone: "",
  referral_code: "",
  commission_rate: 0,
};

export default function Admin() {
  const [tab, setTab] = useState("resellers");
  const [showAddReseller, setShowAddReseller] = useState(false);

  const [newReseller, setNewReseller] = useState({ ...BLANK_RESELLER });

  /** =========================
   *  YOUR EXISTING HOOKS (KEEP YOUR REAL ONES)
   * ========================= */
  const sbResellers: AnyReseller[] | null = null;
  const sbResellersLoading = false;

  const referrals: AnyReferral[] | null = null;
  const referralsLoading = false;

  const addSbReseller = { isPending: false };
  const deleteSbReseller = { isPending: false, mutate: (_id: string) => {} };

  const refetchReferrals = () => {};

  /** =========================
   *  UI
   * ========================= */

  return (
    <div className="p-6 space-y-6">

      {/* ================= RESSELLERS ================= */}
      {tab === "resellers" && (
        <div className="bg-card border rounded-2xl overflow-hidden">

          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="font-bold text-lg text-foreground">
              Resellers
            </h2>

            <button
              onClick={() => setShowAddReseller(v => !v)}
              className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm"
            >
              Add
            </button>
          </div>

          {/* ADD FORM */}
          {showAddReseller && (
            <motion.div className="p-6 border-b grid sm:grid-cols-2 gap-4">

              <div>
                <label className="text-xs block mb-1">Name *</label>
                <input
                  className="input"
                  value={newReseller.name}
                  onChange={e =>
                    setNewReseller(p => ({ ...p, name: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-xs block mb-1">Email *</label>
                <input
                  type="email"
                  className="input"
                  value={newReseller.email}
                  onChange={e =>
                    setNewReseller(p => ({ ...p, email: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-xs block mb-1">Phone</label>
                <input
                  className="input"
                  value={newReseller.phone}
                  onChange={e =>
                    setNewReseller(p => ({ ...p, phone: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-xs block mb-1">Referral Code</label>
                <input
                  className="input"
                  value={newReseller.referral_code}
                  onChange={e =>
                    setNewReseller(p => ({
                      ...p,
                      referral_code: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-xs block mb-1">Commission (%)</label>
                <input
                  type="number"
                  className="input"
                  value={newReseller.commission_rate}
                  onChange={e =>
                    setNewReseller(p => ({
                      ...p,
                      commission_rate: Number(e.target.value),
                    }))
                  }
                />
              </div>

              <div className="sm:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={addSbReseller.isPending}
                  className="px-5 py-2 bg-primary text-white rounded-lg"
                >
                  {addSbReseller.isPending ? "Adding..." : "Add Reseller"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowAddReseller(false);
                    setNewReseller({ ...BLANK_RESELLER });
                  }}
                  className="px-5 py-2 bg-secondary rounded-lg"
                >
                  Cancel
                </button>
              </div>

            </motion.div>
          )}

          {/* LIST */}
          {sbResellersLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2].map(i => (
                <div
                  key={i}
                  className="h-16 bg-secondary rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : safeArray(sbResellers).length > 0 ? (
            <div className="divide-y">

              {safeArray(sbResellers).map((r: AnyReseller) => (
                <div
                  key={r.id}
                  className="px-6 py-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.email} {r.phone ? `· ${r.phone}` : ""}
                    </p>
                    {r.referral_code && (
                      <p className="text-xs font-mono">
                        {r.referral_code}
                      </p>
                    )}
                    {r.commission_rate && (
                      <p className="text-xs text-amber-500">
                        {r.commission_rate}% commission
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      confirm("Remove reseller?") &&
                      deleteSbReseller.mutate(r.id)
                    }
                    className="text-red-500 text-xs flex items-center gap-1"
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              ))}

            </div>
          ) : (
            <div className="p-10 text-center text-muted-foreground">
              No resellers found
            </div>
          )}
        </div>
      )}

      {/* ================= REFERRALS ================= */}
      {tab === "referrals" && (
        <div className="bg-card border rounded-2xl overflow-hidden">

          <div className="flex justify-between px-6 py-4 border-b">
            <h2 className="font-bold">Referrals</h2>

            <button onClick={refetchReferrals}>
              <RefreshCw size={18} />
            </button>
          </div>

          {referralsLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="h-14 bg-secondary rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : safeArray(referrals).length > 0 ? (
            <div className="divide-y">

              {safeArray(referrals).map((ref: AnyReferral) => (
                <div key={ref.id} className="px-6 py-4">

                  <div className="flex gap-2 items-center text-sm">
                    <span>{ref.referrer_id || "—"}</span>
                    <span>→</span>
                    <span>{ref.referred_user_id || "—"}</span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {ref.created_at
                      ? new Date(ref.created_at).toLocaleDateString()
                      : ""}
                  </p>

                </div>
              ))}

            </div>
          ) : (
            <div className="p-10 text-center text-muted-foreground">
              No referrals found
            </div>
          )}
        </div>
      )}

    </div>
  );
}
