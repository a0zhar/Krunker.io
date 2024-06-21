/**
* -----------------------------------
* SEROTONIN | KRUNKER.IO GAMING CHAIR
* -----------------------------------
*
* Helper functions for ex: coordinates
**/


function get_distance_3d(x1, y1, z1, x2, y2, z2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  const dz = z1 - z2;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function get_direction(t, e, n, r) {
  return Math.atan2(e - r, t - n);
}

function get_x_direction(e, n, r, i, a, s) {
  const o = Math.abs(n - a);
  const c = get_distance_3d(e, n, r, i, a, s);
  return Math.asin(o / c) * (n > a ? -1 : 1);
}

function get_angle_distance(t, e) {
  return Math.atan2(Math.sin(e - t), Math.cos(t - e));
}
